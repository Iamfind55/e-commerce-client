"use client";

import "../globals.css";
import { ReactNode } from "react";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import { Link, usePathname } from "@/navigation";
import { CartIcon, CircleUser, HomeIcon, ShopIcon } from "@/icons/page";

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
  const pathname = usePathname();
  const mobileMenuItems: MenuItem[] = [
    {
      icon: <HomeIcon size={18} />,
      menu: "Home",
      route: "/",
    },
    {
      icon: <ShopIcon size={16} />,
      menu: "Shop",
      route: "/shop",
    },
    {
      icon: <CartIcon size={16} />,
      menu: "My cart",
      route: "/cart",
    },
    {
      icon: <CircleUser size={18} />,
      menu: "My account",
      route: "/customer",
    },
  ];

  const activeClassName = "text-neon_pink";
  const inactiveClassName = "text-gray-500";

  return (
    <div>
      <Header />
      {children}
      <Footer />
      <div className="block sm:hidden sticky -bottom-2 z-10 bg-white border">
        <div className="bg-white pt-4 pb-4 block lg:hidden w-full">
          <div className="w-full flex items-center justify-around">
            {mobileMenuItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  href={item?.route}
                  key={item?.route}
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
