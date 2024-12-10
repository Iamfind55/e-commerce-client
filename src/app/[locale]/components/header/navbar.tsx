"use client";
import {
  ArrowDownIcon,
  CancelIcon,
  CartIcon,
  LanguageIcon,
  MenuIcon,
  ProductIcon,
  SearchIcon,
  ShopIcon,
} from "@/icons/page";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import DropdownComponent from "@/components/dropdown";
import { IoLogInOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { usePathname } from "@/navigation";
import Drawer from "@/components/drawer";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("langingPage");
  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };

  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);
  const [originalOffset, setOriginalOffset] = React.useState(0);

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
        className={`bg-second_black
      ${
        isSticky
          ? "fixed top-0 left-0 right-0 mx-auto px-4 z-49"
          : "mx-auto px-4 z-50"
      }
      flex items-center justify-between bg-second_black p-4
    `}
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
              onClick={() => toggleOpenDrawer()}
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
                  <p>Product</p>
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
                    Products
                  </Link>
                </div>
                <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href="/shop"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <ShopIcon size={18} className="text-second_black" />
                    Shops
                  </Link>
                </div>
              </div>
            </DropdownComponent>
            <div>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon size={16} className="text-neon_pink" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="h-8 bg-white text-base border text-xs rounded block w-96 ps-10 p-2 focus:outline-none focus:ring-1"
                  placeholder="Search.."
                  required
                  // value={searchTerm}
                  // onChange={handleSearch}
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
                    size={18}
                    className="cursor-pointer text-white hover:text-neon_pink"
                  />
                  <p className="hidden sm:block">Languages</p>
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
                    <Image
                      src="/images/english-flag.jpg"
                      alt=""
                      height={20}
                      width={20}
                    />
                    English
                  </Link>
                </div>
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href={pathname}
                    locale="la"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image
                      src="/images/lao-flag.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    Laos
                  </Link>
                </div>
              </div>
            </DropdownComponent>
            <div className="hidden md:block">
              <Link
                href="/signin"
                className="flex items-start justify-center cursor-pointer text-sm hover:text-neon_pink"
              >
                <IoLogInOutline size={16} />
                &nbsp;Log in {t("_text")}
              </Link>
            </div>
            <div className="hidden md:block">
              <Link
                href="/cart"
                className="flex items-start justify-center cursor-pointer text-sm hover:text-neon_pink"
              >
                <CartIcon size={16} />
                &nbsp;My cart
              </Link>
            </div>
            <div
              className="block lg:hidden cursor-pointer"
              // onClick={toggleOpenDrawer}
            >
              <SearchIcon size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <Drawer
        isOpen={openDrawer}
        onClose={toggleOpenDrawer}
        title="TIKTOKSHOP"
        icon={<CancelIcon size={24} />}
      >
        <ul className="flex items-start justify-start gap-2 flex-col py-2">
          <li className="text-gray-500 w-full flex items-center justify-start gap-2 p-2 hover:bg-gray-200 rounded border-b border-gray-200">
            <ShopIcon />
            <span className="text-xs">Women</span>
          </li>
          <li className="text-gray-500 w-full flex items-center justify-start gap-2 p-2 hover:bg-gray-200 rounded border-b border-gray-200">
            <ShopIcon />
            <span className="text-xs">Clothing</span>
          </li>
          <li className="text-gray-500 w-full flex items-center justify-start gap-2 p-2 hover:bg-gray-200 rounded border-b border-gray-200">
            <ShopIcon />
            <span className="text-xs">Shoes</span>
          </li>
          <li className="text-gray-500 w-full flex items-center justify-start gap-2 p-2 hover:bg-gray-200 rounded border-b border-gray-200">
            <ShopIcon />
            <span className="text-xs">Kitchen</span>
          </li>
          <li className="text-gray-500 w-full flex items-center justify-start gap-2 p-2 hover:bg-gray-200 rounded border-b border-gray-200">
            <ShopIcon />
            <span className="text-xs">Flower</span>
          </li>
        </ul>
      </Drawer>
    </>
  );
}
