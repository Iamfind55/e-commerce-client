"use client";

import Header from "../components/header/page";
import Footer from "../components/footer/page";
import "../globals.css";
import {
  CalendarIcon,
  OutlineHomeIcon,
  TimeIcon,
  TransactionIcon,
} from "@/icons/page";
import { ReactNode } from "react";
import { Link, usePathname } from "@/navigation";

// export const metadata = {
//   title: "Tiktokshop",
//   description:
//     "We are the represent of tiktok for selling best product to you.",
// };

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
      icon: <OutlineHomeIcon size={18} />,
      menu: "Home",
      route: "/client",
    },
    {
      icon: <CalendarIcon size={16} />,
      menu: "Search",
      route: "/doctor/booking-history",
    },
    {
      icon: <TimeIcon size={16} />,
      menu: "My cart",
      route: "/doctor/schadule",
    },
    {
      icon: <TransactionIcon size={18} />,
      menu: "My account",
      route: "/doctor/transaction",
    },
  ];

  const activeClassName = "text-secondary";
  const inactiveClassName = "text-gray-500";

  return (
    <div>
      <Header />
      {children}
      <Footer />
      <div className="block sm:hidden sticky bottom-0 z-10 bg-white border">
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
