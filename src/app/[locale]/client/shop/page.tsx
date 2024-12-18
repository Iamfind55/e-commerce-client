"use client";

import React from "react";
import ShopDetails from "./shop-detail";
import Breadcrumb from "@/components/breadCrumb";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-start justify-start flex-col gap-4">
        <Breadcrumb
          items={[{ label: "Shop-setting", value: "/client/shop" }]}
        />
        <ShopDetails />
      </div>
    </>
  );
}
