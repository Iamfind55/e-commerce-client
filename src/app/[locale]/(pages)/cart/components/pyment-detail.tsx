import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { BackIcon } from "@/icons/page";
import IconButton from "@/components/iconButton";

interface PaymentDetailsProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaymentDetails({ tab, setTab }: PaymentDetailsProps) {
  const t = useTranslations("myCartPage");
  const h = useTranslations("homePage");
  const [total, setTotal] = React.useState<number>(0);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  React.useEffect(() => {
    const total = cartItems.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotal(total);
  }, [cartItems]);

  const handleNext = () => {
    setTab(tab + 1);
  };

  const handlePrevious = () => {
    setTab(tab - 1);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <div className="container w-full flex flex-col sm:flex-row items-start justify-between gap-6">
        <div className="w-full sm:w-3/5">
          <h1 className="border-b py-2">{t("_payment_title")}</h1>
          <div className="flex items-center justify-center gap-1 flex-col h-52">
            <p>{t("_wallet_status")}: $0.00</p>
            <IconButton
              className="rounded text-white p-2 bg-neon_pink w-auto mt-4 text-xs"
              title="Pay with wallet"
              type="button"
              onClick={() => handleNext()}
            />
          </div>
          <div className="flex items-start justify-start text-xs gap-2 pl-4">
            {t("_i_agree")}
            <Link href="/terms-condition" className="text-neon_pink underline ">
              {h("_terms_conditions")},
            </Link>
            <Link href="/refund-policy" className="text-neon_pink underline">
              {h("_refund_policy")}
            </Link>
            <p className="text-gray-500">and</p>
            <Link href="/privacy-policy" className="text-neon_pink underline">
              {h("_privacy_policy")}.
            </Link>
          </div>
          <IconButton
            className="rounded text-gray-500 p-2 w-auto mt-4 text-xs hover:border hover:border-gray-500"
            title="Back"
            type="button"
            icon={<BackIcon size={16} className="text-gray-500" />}
            isFront={true}
            onClick={() => handlePrevious()}
          />
        </div>
        <div className="w-full sm:w-2/5">
          <div className="w-full flex items-center justify-between border-b">
            <h1 className="py-2">{t("_abstract")}:</h1>
            <p className="text-white bg-neon_blue py-1 px-3 rounded text-xs">
              {cartItems.length} {h("_products")}
            </p>
          </div>
          <div className="w-full flex items-center justify-between px-2 border-b">
            <h1 className="py-2 text-sm text-gray-500">{h("_products")}:</h1>
            <p className="py-1 px-3 rounded text-sm text-gray-500">
              {t("_price")}
            </p>
          </div>
          <div className="border-b">
            {cartItems?.map((product, index: number) => (
              <div
                key={product?.id}
                className="flex items-start justify-between gap-2 p-4"
              >
                <div className="text-gray-500 flex items-start justify-start flex-col">
                  <p className="text-sm">
                    {index + 1}.&nbsp;{product?.name}.
                  </p>
                  <p className="text-xs">
                    {t("_price")}: ${(product?.price).toFixed(2)}&nbsp;&nbsp;(
                    {product?.quantity} {t("_items")})
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  ${(product.quantity * product?.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-between px-2">
            <h1 className="py-2 text-sm">{t("_total")}:</h1>
            <p className="py-1 px-3 rounded text-sm">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
