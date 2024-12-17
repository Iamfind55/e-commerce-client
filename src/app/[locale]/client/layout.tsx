"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { usePathname, useRouter } from "next/navigation";

// components
import {
  ArrowNextIcon,
  BankIcon,
  CircleUser,
  LogoutIcon,
  MenuIcon,
  NotiIcon,
  OutlineHomeIcon,
  SearchIcon,
  SettingIcon,
  UserPlusIcon,
  WalletIcon,
  WarningIcon,
} from "@/icons/page";
import "../globals.css";
import DropdownComponent from "@/components/dropdown";

type MenuItem = {
  icon: ReactNode;
  menu: string;
  route: string;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const activeClassName = "text-base";
  const inactiveClassName = "text-gray-500";
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems: MenuItem[] = [
    {
      icon: <OutlineHomeIcon size={18} />,
      menu: "Dashboard",
      route: "/client",
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
          <div className="h-[10vh] flex items-center justify-around">
            {!isCollapsed && (
              <h1 className="text-gray-500 font-bold">Tiktokshop</h1>
            )}
          </div>
          <div className="flex items-center justify-between flex-col h-[85vh]">
            <div className="w-full flex items-center justify-start flex-col gap-2 mt-4">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.route;
                return (
                  <Link
                    href={item.route}
                    key={index + 1}
                    className={`text-gray-500 py-1 flex items-center justify-between gap-2 w-full cursor-pointer px-6 py-2 ${
                      isActive
                        ? "bg-base text-white hover:bg-base hover:text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p className="flex items-start justify-start gap-2 text-sm">
                      {item.icon}
                      {!isCollapsed && (
                        <span className={`text-sm`}>{item.menu}</span>
                      )}
                    </p>
                    {item.route === "/doctor/schadule" && (
                      <WarningIcon className="text-error" size={20} />
                    )}
                    {item.route === "/doctor/appointment" && (
                      <span className="bg-base text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        2
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="w-full flex items-center justify-start flex-col gap-2 border-b pb-4">
              <Link
                href="/client/setting"
                className={`text-gray-500 py-1 flex items-center ${
                  isCollapsed ? "justify-center" : "justify-start"
                } gap-2 w-full cursor-pointer px-6 py-2 ${
                  pathname === "/doctor/setting"
                    ? "border-base bg-base text-white hover:bg-base hover:text-white"
                    : " hover:bg-gray-100"
                }`}
              >
                <SettingIcon size={18} />
                {!isCollapsed && <span className="text-sm">Settings</span>}
              </Link>
              <button
                onClick={handleLogout}
                className={`text-gray-500 py-1 flex items-center ${
                  isCollapsed ? "justify-center" : "justify-start"
                } gap-2 w-full cursor-pointer px-6 py-2 hover:bg-gray-100
                }`}
              >
                <LogoutIcon size={18} />
                {!isCollapsed && (
                  <i className="text-gray-500 text-sm">Logout</i>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={`w-full ${isCollapsed ? "sm:w-[95%]" : "sm:w-4/5"}`}>
          <div className="w-full h-[10vh] flex border-b items-center justify-between px-4">
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
              <SearchIcon size={22} className="text-gray-500 cursor-pointer" />

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
              <DropdownComponent
                className="w-44"
                head={
                  <CircleUser
                    size={28}
                    className="cursor-pointer text-gray-500"
                  />
                }
              >
                <div id="dropdownDivider" className="py-4">
                  <ul
                    className="py-2 text-sm text-gray-700 border-b"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li className="px-5 py-1 flex items-center justify-start gap-2 hover:bg-gray-100">
                      <UserPlusIcon size={18} />
                      <Link
                        href="/client/profile"
                        className="block py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="block sm:hidden px-5 py-1 flex items-center justify-start gap-2 hover:bg-gray-100">
                      <BankIcon size={18} />
                      <Link
                        href="/client/bank"
                        className="block py-2 hover:bg-gray-100"
                      >
                        Bank accounts
                      </Link>
                    </li>
                    <li className="px-5 py-1 flex items-center justify-start gap-2 hover:bg-gray-100">
                      <WalletIcon size={18} />
                      <Link
                        href="/client/wallet"
                        className="block py-2 hover:bg-gray-100"
                      >
                        My wallet
                      </Link>
                    </li>
                    <li className="block sm:hidden px-5 py-1 flex items-center justify-start gap-2 hover:bg-gray-100">
                      <SettingIcon size={18} />
                      <Link
                        href="/client/setting"
                        className="block py-2 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className="px-4 py-1 flex items-center justify-start gap-2 hover:bg-gray-100 mt-4">
                    <LogoutIcon size={18} className="text-red-800" />
                    <Link
                      href="#"
                      onClick={handleLogout}
                      className="block text-sm text-red-800"
                    >
                      Log out
                    </Link>
                  </div>
                </div>
              </DropdownComponent>
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
                  href={item?.route}
                  key={index + 1}
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
