"use client";

import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { logout } from "@/redux/slice/authSlice";
import { Link as NavigateLink, usePathname } from "@/navigation";
import { useRouter, usePathname as useNextPathName } from "next/navigation";

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
import ShopDrawer from "@/components/shopDrawer";
import RatingStar from "@/components/vipStar";
import { showNotification } from "@/redux/slice/notificationSlice";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { QUERY_COUNT_NEW_TRANSACTION, QUERY_COUNT_NO_PICK_UP_ORDER, SUBSCRIPTION_ORDER, TRANSACTION_SUBSCRIPTION } from "@/api/subscription";
import { useToast } from "@/utils/toast";
import { RootState } from "@/redux/store";
import { addOrderAmount, addTransactionAmount } from "@/redux/slice/amountSlice";

type MenuItem = {
  icon: ReactNode;
  menu: string;
  route: string;
  children?: MenuItem[];
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { errorMessage } = useToast();
  const nextPathname = useNextPathName();
  const { user } = useSelector((state: any) => state.auth);
  const { data: transactionData, error: transactionError } = useSubscription(TRANSACTION_SUBSCRIPTION);
  const { data: orderData, error: orderError } = useSubscription(SUBSCRIPTION_ORDER);
  const { orderAmount } = useSelector(
    (state: RootState) => state.amounts
  );
  const t = useTranslations("homePage");
  const s = useTranslations("shop_sidebar");
  const locale = nextPathname.split("/")[1];

  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };

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
      menu: s("_dashboard"),
      route: "/client",
    },
    {
      icon: <AppleIcon size={16} />,
      menu: s("_product"),
      route: "/client/products",
      children: [
        {
          icon: null,
          menu: s("_all_product"),
          route: "/client/products/product-list",
        },
        {
          icon: null,
          menu: s("_apply_new_product"),
          route: "/client/products/apply-product",
        },
      ],
    },
    {
      icon: <ShopIcon size={16} />,
      menu: s("_shop_management"),
      route: "/client/shop",
    },
    {
      icon: <WalletIcon size={16} />,
      menu: s("_finance"),
      route: "/client/wallet",
      children: [
        { icon: null, menu: s("_wallet"), route: "/client/wallet" },
        {
          icon: null,
          menu: s("_recharge_history"),
          route: "/client/wallet/recharge",
        },
        {
          icon: null,
          menu: s("_withdraw_history"),
          route: "/client/wallet/withdraw",
        },
      ],
    },
    {
      icon: <CartIcon size={18} />,
      menu: s("_order_management"),
      route: "/client/order",
    },
    {
      icon: <NotiIcon size={18} />,
      menu: s("_notification"),
      route: "/client/notification",
    },
    {
      icon: <CallIcon size={16} />,
      menu: s("_contact_us"),
      route: "/client/contact-us",
    },
    {
      icon: <CircleUser size={16} />,
      menu: s("_member_only"),
      route: "/client/member-only",
    },
    {
      icon: <VIPIcon size={16} />,
      menu: s("_apply_VIP_product"),
      route: "/client/apply-vip-product",
    },
  ];

  const handleLogout = async () => {
    Cookies?.remove("auth_token");
    dispatch(logout());
    router.push("/signin");
  };

  const [queryCountTrans] = useLazyQuery(QUERY_COUNT_NEW_TRANSACTION, {
    fetchPolicy: "cache-and-network",
  });

  const [queryCountNopickUpOrder] = useLazyQuery(QUERY_COUNT_NO_PICK_UP_ORDER, {
    fetchPolicy: "cache-and-network",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryCountTrans();
        const totalTransactions = result?.data?.countNewTransaction?.total || 0;

        if (totalTransactions > 0) {
          dispatch(addTransactionAmount(totalTransactions));
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
    fetchData();
  }, [transactionData, dispatch]);

  React.useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await queryCountNopickUpOrder({
          variables: {
            "orderStatus": "NO_PICKUP"
          }
        });
        const totalNopickupOrders = result?.data?.countNewOrder?.total || 0;
        if (totalNopickupOrders > 0) {
          dispatch(addOrderAmount(totalNopickupOrders));
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
    fetchOrderData();
  }, [orderData, dispatch]);

  React.useEffect(() => {
    if (orderData) {
      dispatch(showNotification(orderData?.subscribeNewOrder?.notification_type));
    }
    if (transactionError) {
      errorMessage({
        message: "Order socket error!",
        duration: 2000,
      });
    }
  }, [orderData, orderError]);

  React.useEffect(() => {
    if (transactionData) {
      dispatch(showNotification(transactionData?.transactionSubscribe?.notification_type));
    }
    if (transactionError) {
      errorMessage({
        message: "Transaction socket error!",
        duration: 2000,
      });
    }
  }, [transactionData, transactionError]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex items-center justify-start">
        <div
          className={`hidden sm:block h-screen ${isCollapsed ? "w-[5%]" : "w-1/5"
            }`}
        >
          <div className="h-[10vh] flex items-center justify-around bg-gray-800">
            {!isCollapsed && (
              <Image
                className="rounded-full"
                src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1740281086/logo2_dwqmfv.png"
                alt=""
                width={250}
                height={200}
              />
            )}
          </div>
          <div className="flex items-center justify-between flex-col h-[85vh]">
            <div className="w-full flex flex-col gap-2 mt-4">
              {menuItems.map((item, index) => {
                const languagePrefix = pathname.split("/")[1];
                const routePath = item.route.startsWith("/")
                  ? item.route
                  : `/${item.route}`;

                // Ensure languagePrefix does not duplicate in `item.route`
                const fullRoute = routePath.startsWith(`/${languagePrefix}`)
                  ? routePath
                  : `/${languagePrefix}${routePath}`.replace(/\/{2,}/g, "/");

                const isActive =
                  pathname === fullRoute ||
                  (item.children &&
                    item.children.some(
                      (child) =>
                        pathname ===
                        `/${languagePrefix}${child.route.replace(/^\/+/, "")}`
                    ));
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
                      className={`flex items-center justify-between cursor-pointer px-2 py-2 ${isActive
                        ? "bg-gray-200 text-neon_pink"
                        : "text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span>{item.icon}</span>
                        <span className={`${isCollapsed ? "hidden" : "block"}`}>
                          {item.menu}
                        </span>
                        <span className={`${isCollapsed ? "hidden" : "block"}`}>
                          {item.menu === s("_order_management") ? (
                            <span className="ml-6 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {orderAmount}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
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
                      <div className={`${isCollapsed ? "ml-2" : "ml-6"}`}>
                        {item.children.map((child, idx) => {
                          const languagePrefix = pathname.split("/")[1];
                          const childRoutePath = child.route.startsWith("/")
                            ? child.route
                            : `/${child.route}`;

                          const fullChildRoute = childRoutePath.startsWith(
                            `/${languagePrefix}`
                          )
                            ? childRoutePath
                            : `/${languagePrefix}${childRoutePath}`.replace(
                              /\/{2,}/g,
                              "/"
                            );

                          const isChildActive = pathname === fullChildRoute;

                          return (
                            <Link
                              href={child.route}
                              key={idx}
                              className={`flex items-center justify-start gap-3 py-1 text-sm ${isChildActive
                                ? "text-neon_pink"
                                : "text-gray-500 hover:text-neon_pink"
                                }`}
                            >
                              {!isCollapsed && <CircleIcon size={10} />}
                              <span className={`${isCollapsed && "text-xs"}`}>
                                {child.menu}
                              </span>
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
          <div className="w-full h-[10vh] flex items-center justify-between px-4 bg-gray-700">
            <div className="hidden sm:block w-1/2 flex items-center justify-start gap-4 ">
              {isCollapsed ? (
                <div className="hidden sm:block rounded-full p-1 cursor-pointer">
                  <ArrowNextIcon
                    size={24}
                    onClick={toggleSidebar}
                    className="border rounded-full hover:border-base hover:bg-base text-white"
                  />
                </div>
              ) : (
                <div className="hidden sm:block rounded-full p-1 cursor-pointer text-white">
                  <MenuIcon
                    size={20}
                    className="cursor-pointer"
                    onClick={toggleSidebar}
                  />
                </div>
              )}
            </div>
            <div className="block sm:hidden w-1/2 flex items-center justify-start gap-4 ">
              <div className="rounded-full p-1 cursor-pointer text-white">
                <MenuIcon
                  size={20}
                  className="cursor-pointer"
                  onClick={toggleOpenDrawer}
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex items-center justify-end gap-3">
              <RatingStar star={user.shop_vip} maxStar={5} />
              <DropdownComponent
                className="w-56 cursor-pointer"
                head={
                  <div className="flex items-start justify-start gap-1 text-white text-sm cursor-pointer hover:text-neon_pink">
                    <LanguageIcon
                      size={18}
                      className="cursor-pointer text-white hover:text-neon_pink"
                    />
                  </div>
                }
              >
                <div
                  id="dropdownDivider"
                  className="py-4 flex items-start gap-2 flex-col"
                >
                  <div
                    className={`w-full flex items-start gap-2 cursor-pointer hover:bg-gray-200 py-2 px-4 ${locale === "en"
                      ? "text-neon_pink bg-gray-200 rounded"
                      : "text-gray-500"
                      }`}
                  >
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
                  <div
                    className={`w-full flex items-start gap-2 cursor-pointer hover:bg-gray-200 py-2 px-4 ${locale === "th"
                      ? "text-neon_pink bg-gray-200 rounded"
                      : "text-gray-500"
                      }`}
                  >
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
                  <div
                    className={`w-full flex items-start gap-2 cursor-pointer hover:bg-gray-200 py-2 px-4 ${locale === "vi"
                      ? "text-neon_pink bg-gray-200 rounded"
                      : "text-gray-500"
                      }`}
                  >
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
                  <div
                    className={`w-full flex items-start gap-2 cursor-pointer hover:bg-gray-200 py-2 px-4 ${locale === "zh"
                      ? "text-neon_pink bg-gray-200 rounded"
                      : "text-gray-500"
                      }`}
                  >
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
                  <div
                    className={`w-full flex items-start gap-2 cursor-pointer hover:bg-gray-200 py-2 px-4 ${locale === "ms"
                      ? "text-neon_pink bg-gray-200 rounded"
                      : "text-gray-500"
                      }`}
                  >
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
                  <div
                    className={`w-full flex items-start gap-2 cursor-pointer hover:bg-gray-200 py-2 px-4 ${locale === "fr"
                      ? "text-neon_pink bg-gray-200 rounded"
                      : "text-gray-500"
                      }`}
                  >
                    <NavigateLink
                      href={pathname}
                      locale="ms"
                      className="w-full text-sm flex items-center justify-start gap-2"
                    >
                      <Image
                        src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1740287269/franch-flag_hgcujs.webp"
                        alt=""
                        height={20}
                        width={20}
                      />
                      {t("_french")}
                    </NavigateLink>
                  </div>
                </div>
              </DropdownComponent>
              <NotiIcon
                size={22}
                className="text-white cursor-pointer"
                onClick={() => router.push("/client/notification")}
              />
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

      <ShopDrawer isOpen={openDrawer} onClose={toggleOpenDrawer}>
        <div className="flex items-center justify-between flex-col h-[85vh]">
          <div className="w-full flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const languagePrefix = pathname.split("/")[1];
              const routePath = item.route.startsWith("/")
                ? item.route
                : `/${item.route}`;

              // Ensure languagePrefix does not duplicate in `item.route`
              const fullRoute = routePath.startsWith(`/${languagePrefix}`)
                ? routePath
                : `/${languagePrefix}${routePath}`.replace(/\/{2,}/g, "/");

              const isActive =
                pathname === fullRoute ||
                (item.children &&
                  item.children.some(
                    (child) =>
                      pathname ===
                      `/${languagePrefix}${child.route.replace(/^\/+/, "")}`
                  ));
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
                    className={`flex items-center justify-between cursor-pointer px-2 py-2 ${isActive
                      ? "bg-gray-200 text-neon_pink"
                      : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      {item.icon}
                      <span className={`${isCollapsed ? "hidden" : "block"}`}>
                        {item.menu}
                      </span>
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
                    <div className="ml-5">
                      {item.children.map((child, idx) => {
                        const languagePrefix = pathname.split("/")[1];
                        const childRoutePath = child.route.startsWith("/")
                          ? child.route
                          : `/${child.route}`;

                        const fullChildRoute = childRoutePath.startsWith(
                          `/${languagePrefix}`
                        )
                          ? childRoutePath
                          : `/${languagePrefix}${childRoutePath}`.replace(
                            /\/{2,}/g,
                            "/"
                          );

                        const isChildActive = pathname === fullChildRoute;

                        return (
                          <Link
                            href={child.route}
                            key={idx}
                            className={`flex items-center justify-start gap-3 py-1 text-sm ${isChildActive
                              ? "text-neon_pink"
                              : "text-gray-500 hover:text-neon_pink"
                              }`}
                          >
                            <CircleIcon size={10} />
                            <span className="text-xs">{child.menu}</span>
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
      </ShopDrawer>
    </div>
  );
}
