import {
  BankIcon,
  CalendarIcon,
  DoctorIcon,
  OutlineHomeIcon,
  TransactionIcon,
} from "@/icons/page";
import { ReactNode } from "react";

type MenuItem = {
  icon: ReactNode;
  menu: string;
  route: string;
};

export const menuItems: MenuItem[] = [
  {
    icon: <OutlineHomeIcon size={18} />,
    menu: "Dashboard",
    route: "/client",
  },
  {
    icon: <CalendarIcon size={16} />,
    menu: "Booking history",
    route: "/client/booking-history",
  },
  {
    icon: <DoctorIcon size={16} />,
    menu: "All doctors",
    route: "/client/doctor",
  },
  {
    icon: <BankIcon size={18} />,
    menu: "Bank accounts",
    route: "/client/bank",
  },
  {
    icon: <TransactionIcon size={18} />,
    menu: "Transactions",
    route: "/client/transaction",
  },
];

export const mobileMenuItems: MenuItem[] = [
  {
    icon: <OutlineHomeIcon size={18} />,
    menu: "Home",
    route: "/client",
  },
  {
    icon: <CalendarIcon size={16} />,
    menu: "History",
    route: "/client/booking-history",
  },
  {
    icon: <DoctorIcon size={16} />,
    menu: "Doctor",
    route: "/client/doctor",
  },
  {
    icon: <TransactionIcon size={18} />,
    menu: "Transaction",
    route: "/client/transaction",
  },
];
