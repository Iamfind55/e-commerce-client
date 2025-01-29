import React, { useEffect, useState, useRef } from "react";
import { BackIcon, NextIcon } from "@/icons/page";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CATEGORIES_HEADER } from "@/api/category";
import { GetHeaderCategoriesResponse } from "@/types/header-category";
import { Link } from "@/navigation";

type DrawerTypes = {
  isOpen: boolean;
  onClose?: () => void;
};

const Drawer = ({ isOpen, onClose }: DrawerTypes) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [getCategories, { data }] = useLazyQuery<GetHeaderCategoriesResponse>(
    QUERY_CATEGORIES_HEADER,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose && onClose();
        setActiveCategory(null); // Close subcategory menu on outside click
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  console.log(data);

  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50">
      {/* Wrap everything inside a ref container */}
      <div ref={drawerRef} className="flex">
        {/* Side Menu */}
        <div className="w-64 bg-white shadow-lg h-full p-2 overflow-y-auto">
          <div className="flex justify-end items-center mb-2">
            <button className="rounded" onClick={onClose}>
              <BackIcon size={20} className="text-gray-500" />
            </button>
          </div>
          <ul className="flex flex-col text-gray-700">
            {data?.getCategories?.data.map((category) => {
              const hasSubcategories =
                category.subcategories && category.subcategories.length > 0;
              return (
                <li
                  key={category.id}
                  className={`flex items-center justify-between gap-2 p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-200`}
                  onMouseEnter={() =>
                    setActiveCategory(
                      activeCategory === category.id ? null : category.id
                    )
                  }
                >
                  <span className="text-sm">{category.name.name_en}</span>
                  {hasSubcategories && <NextIcon size={16} />}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mega Menu for Subcategories */}
        {activeCategory &&
          data?.getCategories?.data.some(
            (cat) =>
              (cat.id === activeCategory && cat.subcategories?.length) ?? 0 > 0
          ) && (
            <div className="w-[700px] h-full bg-white shadow-lg p-4">
              <div className="grid grid-cols-3 gap-4">
                {data?.getCategories?.data
                  .find((cat) => cat.id === activeCategory)
                  ?.subcategories?.map((sub) => (
                    <div key={sub.id} className="space-y-1">
                      <h3 className="text-sm font-medium text-black hover:cursor-pointer">
                        {sub.name.name_en}
                      </h3>
                      <ul className="space-y-1">
                        {(sub.subcategories ?? []).map((child) => (
                          <Link
                            href={`/category/${child.id}?name=${child.name?.name_en}`}
                            key={child.id}
                            onClick={() => {
                              if (onClose) onClose();
                            }}
                          >
                            <li
                              key={child.id}
                              className="text-xs text-gray-600 hover:text-neon_pink cursor-pointer"
                            >
                              {child.name.name_en}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Drawer;
