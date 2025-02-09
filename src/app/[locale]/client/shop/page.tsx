"use client";

import React from "react";
import ShopDetails from "./shop-detail";
import Breadcrumb from "@/components/breadCrumb";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("shop_sidebar");
  return (
    <>
      <div className="flex items-start justify-start flex-col gap-4">
        <Breadcrumb
          items={[{ label: t("_shop_management"), value: "/client/shop" }]}
        />
        <ShopDetails />
      </div>
    </>
  );
}
