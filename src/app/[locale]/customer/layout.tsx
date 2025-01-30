"use client";

import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/redux/slice/customerAuthSlice";

// components
import "../globals.css";
import Footer from "../components/footer/page";
import Header from "../components/header/page";

// icons
import {
  CartIcon,
  CircleUser,
  DashboardIcon,
  LogoutIcon,
  PurchaseIcon,
  WalletIcon,
} from "@/icons/page";


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
  const inactiveClassName = "text-gray-500";

  const { customer } = useSelector((state: any) => state.customerAuth);

  const menuItems: MenuItem[] = [
    {
      icon: <DashboardIcon size={16} />,
      menu: "Instrument panel",
      route: "/customer/instrument-panel",
    },
    {
      icon: <PurchaseIcon size={16} />,
      menu: "Purchase history",
      route: "/customer/purchase-history",
    },
    {
      icon: <WalletIcon size={16} />,
      menu: "My wallet",
      route: "/customer/my-wallet",
    },
    // {
    //   icon: <NewsIcon size={16} />,
    //   menu: "News and event",
    //   route: "/customer/news-events",
    // },
    {
      icon: <CircleUser size={16} />,
      menu: "Manage profile",
      route: "/customer/profile",
    },
  ];

  const mobileMenuItems: MenuItem[] = [
    {
      icon: <CartIcon size={16} />,
      menu: "Instrument panel",
      route: "/customer/instrument-panel",
    },
    {
      icon: <CartIcon size={16} />,
      menu: "Purchase history",
      route: "/customer/purchase-history",
    },
    {
      icon: <WalletIcon size={16} />,
      menu: "My wallet",
      route: "/customer/my-wallet",
    },
    {
      icon: <CircleUser size={16} />,
      menu: "News and event",
      route: "/customer/news-events",
    },
    {
      icon: <CircleUser size={16} />,
      menu: "Profile",
      route: "/customer/profile",
    },
  ];

  const handleLogout = async () => {
    Cookies.remove("auth_token");
    dispatch(signOut());
    router.push("/cus-signin");
  };

  return (
    <div className="h-auto bg-bg_color">
      <Header />
      <div className="flex items-center justify-center my-0 sm:my-6">
        <div className="container flex items-start justify-start w-full px-4overflow-scroll pb-0 sm:pb-20 sm:pb-2 gap-6 py-0 sm:py-6">
          <div className="w-1/4 hidden sm:flex flex-col gap-2 shadow rounded-md bg-white">
            <div className="w-full bg-neon_pink p-6 rounded-tr-md rounded-tl-md">
              <Image
                src={
                  customer?.image
                    ? customer?.image
                    : "/images/default-image.webp"
                }
                alt="Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
              <p className="text-sm text-white">
                {customer?.firstName}&nbsp;{customer?.lastName}
              </p>
              <p className="text-xs text-white">{customer?.email}</p>
            </div>
            <div className="w-full flex items-start justify-start flex-col gap-2">
              {menuItems.map((item, index) => {
                const isActive = pathname.includes(item.route);
                return (
                  <div key={index} className="w-full">
                    <div
                      onClick={() => router.push(item.route)}
                      className={`flex items-center justify-between cursor-pointer px-6 py-2 ${
                        isActive
                          ? "bg-gray-200 text-neon_pink"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        {item.icon}
                        <span>{item.menu}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full mt-6">
              <div
                onClick={() => handleLogout()}
                className="w-full flex items-center justify-center gap-2 text-sm bg-gray-500 mt-6 py-2 rounded-br-md rounded-bl-md cursor-pointer"
              >
                <LogoutIcon size={18} />
                <span>Logout</span>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-3/4 rounded-md py-4 text-gray-500">
            {children}
          </div>
        </div>
      </div>

      <Footer />
      {/* Mobile screen code  */}
      <div className="block sm:hidden sticky bottom-0 z-10 bg-white">
        <div className="bg-white pt-4 pb-4 block lg:hidden w-full">
          <div className="w-full flex items-center justify-around">
            {mobileMenuItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  href={item?.route}
                  key={item.route + 1}
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
