"use client";

import {
  CartIcon,
  CheckCircleIcon,
  DeliveryIcon,
  DollarIcon,
  LocationIcon,
  NextIcon,
} from "@/icons/page";
import React from "react";
import MyCartDetails from "./components/cart-detail";
import { useRouter } from "@/navigation";
import ShippingInformation from "./components/shipping-detail";
import DeliveryDetails from "./components/delivery-detail";
import PaymentDetails from "./components/pyment-detail";
import { useTranslations } from "next-intl";
import Confirmation from "./components/confirmation";
export default function MyCart() {
  const t = useTranslations("myCartPage");
  const u = useTranslations("homePage");
  const router = useRouter();
  const [tab, setTab] = React.useState<number>(1);
  const handleBack = () => {
    if (tab > 1) {
      setTab(tab - 1);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="flex items-center justify-center bg-bg_color">
      <div className="container px-4 py-6 flex items-start justify-start flex-col gap-4">
        <div className="w-full">
          <div className="mb-b">
            <ul className="flex flex-wrap items-center justify-center -mb-px text-sm font-medium text-center gap-0 sm:gap-4 rounded">
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 1 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(1)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 1 && "text-neon_pink"
                    }`}
                  >
                    <CartIcon size={26} />
                    <p className="hidden sm:block text-sm">{u("_my_cart")}</p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 2 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(2)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 2 && "text-neon_pink"
                    }`}
                  >
                    <LocationIcon size={26} />
                    <p className="hidden sm:block text-sm">
                      {t("_shipping_information")}
                    </p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 3 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(3)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 3 && "text-neon_pink"
                    }`}
                  >
                    <DeliveryIcon size={26} />
                    <p className="hidden sm:block text-sm">
                      {t("_delivery_information")}
                    </p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 4 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(4)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 4 && "text-neon_pink"
                    }`}
                  >
                    <DollarIcon size={26} />
                    <p className="hidden sm:block text-sm">{t("_payment")}</p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 5 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(5)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 5 && "text-neon_pink"
                    }`}
                  >
                    <CheckCircleIcon size={26} />
                    <p className="hidden sm:block text-sm">
                      {t("_confirmation")}
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div
            id="default-tab-content"
            className="p-2 p-3 bg-white text-second_black mt-6 flex items-start justify-start flex-col gap-6"
          >
            <div className="w-full">
              {tab === 1 && <MyCartDetails tab={tab} setTab={setTab} />}
              {tab === 2 && <ShippingInformation tab={tab} setTab={setTab} />}
              {tab === 3 && <DeliveryDetails tab={tab} setTab={setTab} />}
              {tab === 4 && <PaymentDetails tab={tab} setTab={setTab} />}
              {tab === 5 && <Confirmation />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
