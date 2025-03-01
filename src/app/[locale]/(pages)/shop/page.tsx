"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

// icons, utils, hooks
import { SearchIcon } from "@/icons/page";
import ShopCard from "@/components/shopCard";
import useFilter from "./hooks/useFilter/page";
import EmptyPage from "@/components/emptyPage";
import useFetchShops from "./hooks/useFetchShop";

const categories = [
  "Handbags & Accessories",
  "Christmas",
  "Electronic Products",
  "Kids & Baby",
  "Shoes",
  "Men",
  "Women",
];

export default function Shop() {
  const filter = useFilter();
  const t = useTranslations("shop_page");

  const fetchProducts = useFetchShops({ filter: filter.data });

  // Typing animation states
  const [displayText, setDisplayText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track user input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced search value

  // Debounce effect: Update `debouncedSearch` only after user stops typing for 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler); // Clear timeout if user types again before 500ms
    };
  }, [searchQuery]);

  // Typing animation effect
  useEffect(() => {
    const currentCategory = categories[categoryIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => setCharIndex((prev) => prev - 1), 100);
      } else {
        setIsDeleting(false);
        setCategoryIndex((prev) => (prev + 1) % categories.length);
      }
    } else {
      if (charIndex < currentCategory.length) {
        setTimeout(() => setCharIndex((prev) => prev + 1), 150);
      } else {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    }

    setDisplayText(currentCategory.slice(0, charIndex));
  }, [charIndex, categoryIndex, isDeleting]);

  // Dispatch search query only when `debouncedSearch` updates
  useEffect(() => {
    filter.dispatch({
      type: filter.ACTION_TYPE.KEYWORD,
      payload: debouncedSearch,
    });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-center flex-col bg-bg_color">
      <div className="w-full bg-gradient-to-r from-[#ee1d52] to-[#ee1d52] h-[40vh] flex items-center justify-center">
        <div className="w-11/12 sm:w-1/2 flex items-center justify-center flex-col gap-2 sm:gap-4 p-2 sm:p-0">
          <h1 className="text-sm sm:text-xl">
            Please search for the shop you want to shop at
          </h1>

          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon size={16} className="text-neon_pink" />
            </div>
            <input
              required
              type="text"
              id="simple-search"
              placeholder={t("_search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-white text-gray-500 border text-xs rounded block w-auto ps-10 p-2 focus:outline-none focus:ring-1"
            />
          </div>

          {/* Animated Category Display */}
          <p className="text-gray-100 text-xs sm:text-sm">
            We offer multiple categories including{" "}
            <span className="text-white font-bold">{displayText}</span>
            <span className="text-white animate-blink">|</span>
          </p>
        </div>
      </div>

      {/* Only show shops if user has typed something */}
      {debouncedSearch.trim() !== "" && (
        <div className="container p-6">
          {fetchProducts?.loading ? (
            <div className="w-full flex items-center justify-center">
              <p className="text-gray-500 text-sm">Loading...</p>
            </div>
          ) : fetchProducts?.total ?? 0 > 0 ? (
            <div className="flex items-center justify-center py-6 my-4">
              {fetchProducts?.data?.map((shop) => (
                <div
                  key={shop.id}
                  className="w-full sm:w-1/4 flex items-center justify-center"
                >
                  <ShopCard {...shop} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded w-full">
              <EmptyPage />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
