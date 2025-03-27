"use client";

import React, { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

// apollo
import { useLazyQuery } from "@apollo/client";
import { QUERY_CATEGORIES_HEADER } from "@/api/category";

// components
import Breadcrumb from "@/components/breadCrumb";

// icons, hooks and utils
import { ArrowDownIcon, NextIcon } from "@/icons/page";
import useFilter from "@/app/[locale]/(pages)/product/hooks/useFilter/page";

export default function ApplyProduct() {
    const filter = useFilter();
    const t = useTranslations("shop_product_list");
    const [openMenus, setOpenMenus] = React.useState<string[]>([]);
    const [checkedCategories, setCheckedCategories] = React.useState<string[]>([]);

    const toggleMenu = (menu: string) => {
        setOpenMenus((prev) =>
            prev.includes(menu)
                ? prev.filter((item) => item !== menu)
                : [...prev, menu]
        );
    };

    const findParentCategory = (category: Category): Category | null => {
        if (!data?.getCategories?.data) return null;

        // Recursive search through all categories to find the parent
        const findParent = (categories: Category[]): Category | null => {
            for (const cat of categories) {
                if (cat.subcategories?.some(subcat => subcat.id === category.id)) {
                    return cat;
                }
                if (cat.subcategories) {
                    const parentInSubcategories = findParent(cat.subcategories);
                    if (parentInSubcategories) return parentInSubcategories;
                }
            }
            return null;
        };

        return findParent(data.getCategories.data);
    };

    const toggleCheckbox = (category: Category) => {
        setCheckedCategories((prev) => {
            let newChecked = [...prev];
            const isCurrentlyChecked = newChecked.includes(category.id);
            if (isCurrentlyChecked) {
                const descendants = findAllDescendantIds(category);
                newChecked = newChecked.filter(id => id !== category.id && !descendants.includes(id));
            } else {
                let currentParent = findParentCategory(category);
                let parentsToRemove: string[] = [];

                while (currentParent) {
                    console.log(`🔺 Parent Found: ${currentParent.id}`);
                    parentsToRemove.push(currentParent.id);
                    currentParent = findParentCategory(currentParent);
                }

                newChecked = newChecked.filter(id => !parentsToRemove.includes(id));
                newChecked.push(category.id);
            }
            return newChecked;
        });
    };


    const findAllDescendantIds = (category: Category): string[] => {
        const descendantIds: string[] = [];

        const collectDescendants = (cats?: Category[]) => {
            cats?.forEach(cat => {
                descendantIds.push(cat.id);
                if (cat.subcategories) {
                    collectDescendants(cat.subcategories);
                }
            });
        };

        collectDescendants(category.subcategories);
        return descendantIds;
    };

    const renderMenu = (
        items: Category[],
        level = 0,
        parentId: string | null = null
    ) =>
        items?.map((item, index) => {
            const isMenuOpen = openMenus.includes(item.name.name_en);
            const isChecked = checkedCategories.includes(item.id);
            const isPartiallyChecked =
                item.subcategories?.some(subcat =>
                    checkedCategories.includes(subcat.id)
                ) && !isChecked;

            return (
                <div key={`${level}-${index}`} className="w-full">
                    <div
                        onClick={() =>
                            item.subcategories?.length && toggleMenu(item.name.name_en)
                        }
                        className="flex items-center justify-between cursor-pointer px-4 py-1 text-gray-500 hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-2 text-xs">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={isChecked}
                                ref={(input) => {
                                    if (input) {
                                        input.indeterminate = isPartiallyChecked ? true : false;
                                    }
                                }}
                                onChange={() => toggleCheckbox(item)}
                            />
                            <span>{item.name.name_en}</span>
                        </div>
                        {item.subcategories && item.subcategories.length > 0 && (
                            <span className="text-gray-400">
                                {isMenuOpen ? (
                                    <ArrowDownIcon size={18} />
                                ) : (
                                    <NextIcon size={16} />
                                )}
                            </span>
                        )}
                    </div>
                    {item.subcategories &&
                        item.subcategories.length > 0 &&
                        isMenuOpen && (
                            <div className={`ml-${10 + level * 5} ml-6`}>
                                {renderMenu(item.subcategories, level + 1, item.id)}{" "}
                            </div>
                        )}
                </div>
            );
        });

    const [getCategories, { data }] = useLazyQuery(QUERY_CATEGORIES_HEADER, {
        fetchPolicy: "no-cache",
    });

    React.useEffect(() => {
        getCategories({
            variables: {
                where: { status: "ACTIVE" },
                sortedBy: "created_at_ASC",
            },
        });
    }, [getCategories]);

    return (
        <>
            <Breadcrumb
                items={[
                    { label: t("_product"), value: "/products" },
                    { label: t("_apply_product"), value: "/apply-product" },
                ]}
            />
            <div className="bg-white flex items-start justify-start flex-col gap-2 p-4 mt-4">
                <p className="text-gray-500 text-xs">{t("_filter_title")}:</p>
                <div className="w-full border border-gray-100 rounded">
                    <div className="w-full flex flex-col gap-2 py-2">
                        {renderMenu(data?.getCategories?.data || [])}
                    </div>
                </div>
            </div>
        </>
    );
}
