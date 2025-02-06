"use client";

import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { logout } from "@/redux/slice/authSlice";
import { Link as NavigateLink } from "@/navigation";
import { usePathname, useRouter } from "next/navigation";

// components
import {
  AppleIcon,
  ArrowDownIcon,
  ArrowNextIcon,
  CallIcon,
  CartIcon,
  CircleIcon,
  CircleUser,
  LanguageIcon,
  LogoutIcon,
  MenuIcon,
  NextIcon,
  NotiIcon,
  OutlineHomeIcon,
  ShopIcon,
  VIPIcon,
  WalletIcon,
} from "@/icons/page";
import "../globals.css";
import DropdownComponent from "@/components/dropdown";

type MenuItem = {
  icon: ReactNode;
  menu: string;
  route: string;
  children?: MenuItem[]; // Optional child menus
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const activeClassName = "text-base";
  const t = useTranslations("homePage");
  const inactiveClassName = "text-gray-500";

  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [openMenus, setOpenMenus] = React.useState<string[]>([]);

  // Toggle the dropdown menu
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  const menuItems: MenuItem[] = [
    {
      icon: <OutlineHomeIcon size={16} />,
      menu: "Dashboard",
      route: "/client",
    },
    {
      icon: <AppleIcon size={16} />,
      menu: "Products",
      route: "/client/products",
      children: [
        {
          icon: null,
          menu: "Product List",
          route: "/client/products/product-list",
        },
        {
          icon: null,
          menu: "Apply Product",
          route: "/client/products/apply-product",
        },
      ],
    },
    {
      icon: <ShopIcon size={16} />,
      menu: "Shop management",
      route: "/client/shop",
    },
    {
      icon: <WalletIcon size={16} />,
      menu: "Wallet management",
      route: "/client/wallet",
      children: [
        { icon: null, menu: "My wallet", route: "/client/wallet" },
        {
          icon: null,
          menu: "Recharge history",
          route: "/client/wallet/recharge",
        },
        {
          icon: null,
          menu: "Withdraw history",
          route: "/client/wallet/withdraw",
        },
      ],
    },
    {
      icon: <CartIcon size={16} />,
      menu: "Order management",
      route: "/client/order",
    },
    {
      icon: <NotiIcon size={16} />,
      menu: "Notifications",
      route: "/client/notification",
    },
    {
      icon: <CallIcon size={16} />,
      menu: "Contact Us",
      route: "/client/contact-us",
    },
    {
      icon: <CircleUser size={16} />,
      menu: "Member Only",
      route: "/client/member-only",
    },
    {
      icon: <VIPIcon size={16} />,
      menu: "Apply VIP product",
      route: "/client/apply-vip-product",
    },
  ];

  const mobileMenuItems: MenuItem[] = [
    {
      icon: <OutlineHomeIcon size={18} />,
      menu: "Home",
      route: "/client",
    },
  ];

  const handleLogout = async () => {
    Cookies.remove("auth_token");
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex items-center justify-start">
        <div
          className={`hidden sm:block border-r h-screen ${
            isCollapsed ? "w-[5%]" : "w-1/5"
          }`}
        >
          <div className="h-[10vh] flex items-center justify-around bg-gray-400">
            {!isCollapsed && (
              <Image
                src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860059/tiktokshop-logo_rcmbaq.png"
                alt="Logo"
                width={150}
                height={100}
              />
            )}
          </div>
          <div className="flex items-center justify-between flex-col h-[85vh]">
            <div className="w-full flex flex-col gap-2 mt-4">
              {menuItems.map((item, index) => {
                const isActive =
                  pathname === item.route ||
                  (item.children &&
                    item.children.some((child) => pathname === child.route));
                const isMenuOpen = openMenus.includes(item.menu);

                return (
                  <div key={index} className="w-full">
                    {/* Parent Menu */}
                    <div
                      onClick={() =>
                        item.children
                          ? toggleMenu(item.menu)
                          : router.push(item.route)
                      }
                      className={`flex items-center justify-between cursor-pointer px-6 py-1 ${
                        isActive
                          ? "bg-gray-200 text-neon_pink"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        {item.icon}
                        <span>{item.menu}</span>
                      </div>
                      {item.children && (
                        <span className="text-gray-400">
                          {isMenuOpen ? (
                            <ArrowDownIcon size={18} />
                          ) : (
                            <NextIcon size={16} />
                          )}
                        </span>
                      )}
                    </div>

                    {/* Child Menus */}
                    {item.children && isMenuOpen && (
                      <div className="ml-10">
                        {item.children.map((child, idx) => {
                          const isChildActive = pathname === child.route;
                          return (
                            <Link
                              href={child.route}
                              key={idx}
                              className={`flex items-center justify-start gap-2 py-1 text-xs ${
                                isChildActive
                                  ? "text-neon_pink"
                                  : "text-gray-500 hover:text-neon_pink"
                              }`}
                            >
                              <CircleIcon size={10} />
                              <span>{child.menu}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`w-full ${isCollapsed ? "sm:w-[95%]" : "sm:w-4/5"}`}>
          <div className="w-full h-[10vh] flex border-b items-center justify-between px-4 bg-gray-200">
            <div className="w-1/2 flex items-center justify-start gap-4">
              {isCollapsed ? (
                <div className="hidden sm:block rounded-full p-1 cursor-pointer">
                  <ArrowNextIcon
                    size={24}
                    onClick={toggleSidebar}
                    className="border text-gray-500 rounded-full hover:border-base hover:bg-base hover:text-white"
                  />
                </div>
              ) : (
                <div className="hidden sm:block rounded-full p-1 cursor-pointer">
                  <MenuIcon
                    size={20}
                    className="text-gray-500 cursor-pointer"
                    onClick={toggleSidebar}
                  />
                </div>
              )}
            </div>
            <div className="w-1/2 flex items-center justify-end gap-3">
              <DropdownComponent
                className="w-56 cursor-pointer"
                head={
                  <div className="flex items-start justify-start gap-1 text-white text-sm cursor-pointer hover:text-neon_pink">
                    <LanguageIcon
                      size={18}
                      className="cursor-pointer text-gray-500 hover:text-neon_pink"
                    />
                  </div>
                }
              >
                <div
                  id="dropdownDivider"
                  className="py-4 flex items-start gap-2 flex-col"
                >
                  <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                    <NavigateLink
                      href={pathname}
                      locale="en"
                      className="w-full text-sm flex items-center justify-start gap-2"
                    >
                      <Image
                        src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/english-flag_uw3b7q.jpg"
                        alt=""
                        height={20}
                        width={20}
                      />
                      {t("_english")}
                    </NavigateLink>
                  </div>
                  <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                    <NavigateLink
                      href={pathname}
                      locale="th"
                      className="w-full text-sm flex items-center justify-start gap-2"
                    >
                      <Image
                        src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860059/thai-flag_xwryfh.webp"
                        alt=""
                        height={20}
                        width={20}
                      />
                      {t("_thai")}
                    </NavigateLink>
                  </div>
                  <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                    <NavigateLink
                      href={pathname}
                      locale="vi"
                      className="w-full text-sm flex items-center justify-start gap-2"
                    >
                      <Image
                        src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860059/vietnam-flag_xjendw.webp"
                        alt=""
                        height={20}
                        width={20}
                      />
                      {t("_vietnam")}
                    </NavigateLink>
                  </div>
                  <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                    <NavigateLink
                      href={pathname}
                      locale="zh"
                      className="w-full text-sm flex items-center justify-start gap-2"
                    >
                      <Image
                        src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/chines-flag_xzrvve.webp"
                        alt=""
                        height={20}
                        width={20}
                      />
                      {t("_china")}
                    </NavigateLink>
                  </div>
                  <div className="w-full flex items-start gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                    <NavigateLink
                      href={pathname}
                      locale="ms"
                      className="w-full text-sm flex items-center justify-start gap-2"
                    >
                      <Image
                        src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860058/malaysia-flag_vi6rzw.webp"
                        alt=""
                        height={20}
                        width={20}
                      />
                      {t("_malaysia")}
                    </NavigateLink>
                  </div>
                </div>
              </DropdownComponent>
              <DropdownComponent
                className="w-44"
                head={
                  <NotiIcon
                    size={22}
                    className="text-gray-500 cursor-pointer"
                  />
                }
              >
                <div id="dropdownDivider">
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Earnings
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Separated link
                    </Link>
                  </div>
                </div>
              </DropdownComponent>
              <LogoutIcon
                size={18}
                className="text-neon_pink cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </div>
          <div className="h-[90vh] p-4 bg-bg_color overflow-scroll pb-20 sm:pb-2">
            {children}
          </div>
        </div>
      </div>
      <div className="block sm:hidden sticky bottom-0 z-10 bg-white">
        <div className="bg-white pt-4 pb-4 block lg:hidden w-full">
          <div className="w-full flex items-center justify-around">
            {mobileMenuItems.map((item, index) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  key={index + 1}
                  href={item?.route}
                  className={`flex flex-col items-center cursor-pointer ${
                    isActive ? activeClassName : inactiveClassName
                  }`}
                >
                  {item?.icon}
                  <p className="text-xs">{item?.menu}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
