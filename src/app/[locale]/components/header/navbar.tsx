"use client";

import { useRouter } from "next/navigation";
import Drawer from "@/components/drawer";
import {
  ArrowDownIcon,
  CallIcon,
  CancelIcon,
  CartIcon,
  DoctorIcon,
  LanguageIcon,
  LoginIcon,
  MenuIcon,
  OutlineHomeIcon,
  ProductIcon,
  SearchIcon,
  ShopIcon,
} from "@/icons/page";
import Link from "next/link";
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import DropdownComponent from "@/components/dropdown";
import { IoLogInOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { usePathname } from "@/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("langingPage");
  const [openDrawer, setIsOpenDrawer] = React.useState(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };
  const toggleCloseDrawer = () => {
    setIsOpenDrawer(false);
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
        className={`bg-secondary
      ${
        isSticky
          ? "fixed top-0 left-0 right-0 mx-auto px-4 z-50"
          : "mx-auto px-4 z-50"
      }
      flex items-center justify-between bg-secondary p-4
    `}
        style={
          isSticky
            ? { position: "fixed", zIndex: 50 }
            : { position: "relative", zIndex: 50 }
        }
      >
        <div
          ref={headerRef}
          className="container mx-auto flex items-center justify-between bg-secondary"
        >
          <div className="flex items-start justify-center gap-6">
            <div className="border border-white rounded p-1 animate-bounce">
              <MenuIcon size={20} className="text-white" />
            </div>
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
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-secondary cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href="#"
                    locale="en"
                    className="w-full text-sm flex items-center text-xs justify-start gap-2"
                  >
                    <ProductIcon size={18} className="text-second_black" />
                    Products
                  </Link>
                </div>
                <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-secondary cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href="#"
                    locale="la"
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
                    size={16}
                    className="cursor-pointer text-white hover:text-neon_pink"
                  />
                  <p>Languages</p>
                </div>
              }
            >
              <div
                id="dropdownDivider"
                className="py-4 flex items-start gap-2 flex-col"
              >
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-secondary cursor-pointer hover:bg-gray-200 py-2 px-4">
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
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-secondary cursor-pointer hover:bg-gray-200 py-2 px-4">
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
                href="/signin"
                className="flex items-start justify-center cursor-pointer text-sm hover:text-neon_pink"
              >
                <CartIcon size={16} />
                &nbsp;My cart
              </Link>
            </div>
            <div
              className="block lg:hidden cursor-pointer"
              onClick={toggleOpenDrawer}
            >
              {openDrawer ? (
                <CancelIcon size={24} color="white" />
              ) : (
                <MenuIcon size={24} color="white" />
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        isOpen={openDrawer}
        onClose={toggleCloseDrawer}
        title="OKARDCARE"
        icon={<CancelIcon size={24} />}
        className="w-full md:w-96"
      >
        <div className="w-full flex items-center justify-center flex-col overflow-scroll">
          <Link
            href="/home"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <OutlineHomeIcon size={16} />
            &nbsp; Home
          </Link>
          <Link
            href="/doctor"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <DoctorIcon size={16} />
            &nbsp;Doctor
          </Link>
          <Link
            href="/contact-us"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <CallIcon size={16} />
            &nbsp;Contact us
          </Link>
          <Link
            href="/signin"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <LoginIcon size={16} />
            &nbsp;Sign in
          </Link>
          <Link
            href="/signup"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <FaUserPlus size={16} />
            &nbsp;Sign up
          </Link>
        </div>
      </Drawer>
    </>
  );
}
