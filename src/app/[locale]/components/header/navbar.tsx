"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoLogInOutline } from "react-icons/io5";
import { Link, usePathname } from "@/navigation";

// components
import {
  ArrowDownIcon,
  CartIcon,
  LanguageIcon,
  MenuIcon,
  ProductIcon,
  SearchIcon,
  ShopIcon,
} from "@/icons/page";
import Drawer from "@/components/drawer";
import DropdownComponent from "@/components/dropdown";

// images
import EnglishFlag from "/public/images/english-flag.webp";
import ThaiFlag from "/public/images/thai-flag.webp";
import VietnamFlag from "/public/images/vietnam-flag.webp";
import ChinesFlag from "/public/images/chines-flag.webp";
import MalaysiaFlag from "/public/images/malaysia-flag.webp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("homePage");
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);
  const [originalOffset, setOriginalOffset] = React.useState(0);
  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);

  // query from redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartCount = cartItems.length;


  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };

  const handleScroll = () => {
    if (headerRef.current) {
      if (window.scrollY >= originalOffset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  React.useEffect(() => {
    if (headerRef.current) {
      setOriginalOffset(headerRef.current.offsetTop);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [originalOffset]);

  return (
    <>
      <div
        className={`bg-second_black ${isSticky
          ? "fixed top-0 left-0 right-0 mx-auto px-4 z-49"
          : "mx-auto px-4 z-50"
          } flex items-center justify-between bg-second_black p-4`}
        style={
          isSticky
            ? { position: "fixed", zIndex: 49 }
            : { position: "relative", zIndex: 49 }
        }
      >
        <div
          ref={headerRef}
          className="container mx-auto flex items-center justify-between bg-second_black px-4"
        >
          <div className="flex items-start justify-center gap-6">
            <button
              onMouseEnter={toggleOpenDrawer}
              className="hidden sm:block border border-white rounded p-1"
            >
              <MenuIcon size={20} className="text-white" />
            </button>
            <Link href="/">
              <Image
                className="rounded-full"
                src="/images/tiktokshop-logo.png"
                alt=""
                width={150}
                height={100}
              />
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-around gap-4 text-white cursor-pointer">
            <DropdownComponent
              className="w-56 cursor-pointer"
              head={
                <div className="flex items-start justify-start gap-1 text-white text-sm rounded px-2 py-1 cursor-pointer">
                  <p>{t("_products")}</p>
                  <ArrowDownIcon
                    size={16}
                    className="cursor-pointer text-white"
                  />
                </div>
              }
            >
              <div
                id="dropdownDivider"
                className="py-4 flex items-start gap-2 flex-col"
              >
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href="/"
                    className="w-full text-sm flex items-center text-xs justify-start gap-2"
                  >
                    <ProductIcon size={18} className="text-second_black" />
                    {t("_products")}
                  </Link>
                </div>
                <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href="/shop"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <ShopIcon size={18} className="text-second_black" />
                    {t("_shops")}
                  </Link>
                </div>
              </div>
            </DropdownComponent>
            <div>
              <label htmlFor="simple-search" className="sr-only">
                {t("_search")}
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon size={16} className="text-neon_pink" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="h-8 bg-white text-base border text-xs rounded block w-96 ps-10 p-2 focus:outline-none focus:ring-1"
                  placeholder={t("_search_placeholder")}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around gap-6">
            <DropdownComponent
              className="w-56 cursor-pointer"
              head={
                <div className="flex items-start justify-start gap-1 text-white text-sm cursor-pointer hover:text-neon_pink">
                  <LanguageIcon
                    size={16}
                    className="cursor-pointer text-white hover:text-neon_pink mt-1"
                  />
                  <p className="hidden sm:block">{t("_languages")}</p>
                </div>
              }
            >
              <div
                id="dropdownDivider"
                className="py-4 flex items-start gap-2 flex-col"
              >
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href={pathname}
                    locale="en"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image src={EnglishFlag} alt="" height={20} width={20} />
                    {t("_english")}
                  </Link>
                </div>
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href={pathname}
                    locale="th"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image src={ThaiFlag} alt="" height={20} width={20} />
                    {t("_thai")}
                  </Link>
                </div>
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href={pathname}
                    locale="vi"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image src={VietnamFlag} alt="" height={20} width={20} />
                    {t("_vietnam")}
                  </Link>
                </div>
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href={pathname}
                    locale="zh"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image src={ChinesFlag} alt="" height={20} width={20} />
                    {t("_china")}
                  </Link>
                </div>
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href={pathname}
                    locale="ms"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image src={MalaysiaFlag} alt="" height={20} width={20} />
                    {t("_malaysia")}
                  </Link>
                </div>
              </div>
            </DropdownComponent>
            <div className="hidden md:block">
              <Link
                href="/signin"
                className="flex items-center justify-center cursor-pointer text-sm hover:text-neon_pink"
              >
                <IoLogInOutline size={16} />
                &nbsp;{t("_login_button")}
              </Link>
            </div>
            <div className="hidden md:block relative">
              <Link
                href="/cart"
                className="flex items-center justify-center cursor-pointer text-sm hover:text-neon_pink"
              >
                <CartIcon size={16} />
                {cartCount > 0 && (
                  <span className="animate-bounce absolute -top-3 -left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                &nbsp;{t("_my_cart")}
              </Link>
            </div>
            <div className="block lg:hidden cursor-pointer">
              <SearchIcon size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <Drawer isOpen={openDrawer} onClose={toggleOpenDrawer} />
    </>
  );
}
