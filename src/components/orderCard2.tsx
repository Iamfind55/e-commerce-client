import React from "react";

import StatusBadge from "./status";
import { useTranslations } from "next-intl";
import { formatDate } from "@/utils/dateFormat";
import { IOrderData } from "@/types/order";
import { CloseEyeIcon, DeliveryIcon } from "@/icons/page";
import { useRouter } from "@/navigation";
import IconButton from "./iconButton";
import MyModal from "./modal";
import { useToast } from "@/utils/toast";
import useFilter from "@/app/[locale]/client/order/hooks/useFilter";
import useFetchShopOrders from "@/app/[locale]/client/order/hooks/useFetch";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MUTATION_SHOP_CONFIRM_ORDER } from "@/api/order";
import { QUERY_SHOP_WALLET } from "@/api/wallet";
import { GetShopWalletResponse } from "@/types/wallet";
import Loading from "./loading";

export default function OrderCardComponent1(props: IOrderData) {
  const router = useRouter();
  const o = useTranslations("order_page");
  const t = useTranslations("order_card");
  const p = useTranslations("product_detail");
  const { successMessage, errorMessage } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [shopConfirmOrder] = useMutation(MUTATION_SHOP_CONFIRM_ORDER);

  const [openDeliveryModel, setOpenDeliveryModel] =
    React.useState<boolean>(false);
  const [selectRow, setSelectRow] = React.useState<IOrderData | null>(null);

  const handleOpenDeliveryModal = () => {
    setOpenDeliveryModel(!openDeliveryModel);
  };

  const handleNavigate = () => {
    router.push("/client/wallet");
  };

  const filter = useFilter();
  const fetchShopOrders = useFetchShopOrders({ filter: filter.data });
  const handlePurchaseAndShipping = async () => {
    setIsLoading(true);
    try {
      const res = await shopConfirmOrder({
        variables: {
          shopConfirmOrderId: selectRow?.id,
        },
      });
      if (res?.data?.shopConfirmOrder?.success) {
        successMessage({
          message: "Successful confirm and prepare to delivery",
          duration: 3000,
        });
        handleOpenDeliveryModal();
        fetchShopOrders.refetch();
        setSelectRow(null);
      } else {
        errorMessage({
          message: res?.data?.shopConfirmOrder?.error?.message,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Sorry. Unexpected error happen!",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [getShopWallet, { data }] = useLazyQuery<GetShopWalletResponse>(
    QUERY_SHOP_WALLET,
    {
      fetchPolicy: "no-cache",
    }
  );

  React.useEffect(() => {
    getShopWallet();
  }, [getShopWallet]);

  return (
    <>
      <div className="cursor-pointer flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300 p-2">
        <div className="flex items-start justify-start flex-col gap-2 w-full bg-white rounded text-gray-500">
          <p className="text-xs">
            {t("_order_date")}: {formatDate(props?.created_at)}
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">{t("_payment_status")}: </p>
            <p>
              <StatusBadge status={props?.payment_status} />
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">{t("_order_status")}: </p>
            <p className="text-xs text-white font-extralight">
              <StatusBadge status={props?.order_status} />
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">{t("_sign_in_status")}: </p>
            <p className="text-xs text-white font-extralight">
              <StatusBadge status={props?.sign_in_status} />
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              {t("_order_quantity")}: &nbsp;
              <span className="text-sm">{props?.total_quantity}</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              {p("_total_price")}: &nbsp;
              <span className="text-neon_pink font-medium">
                ${(props?.total_price).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              {t("_profit_rotio")}: &nbsp;
              <span className="text-neon_pink font-medium">
                {props?.profit ? props?.profit : "20"}%
              </span>
            </p>
          </div>
          <div className="flex items-start justify-start gap-4">
            <CloseEyeIcon
              size={18}
              className="cursor-pointer hover:text-red-500"
              onClick={() => router.push(`order/order-list/${props?.order_no}`)}
            />
            <DeliveryIcon
              size={18}
              className={`${
                props.order_status === "NO_PICKUP"
                  ? "cursor-pointer hover:text-red-500"
                  : "cursor-not-allowed opacity-50"
              }`}
              onClick={() => {
                if (props.order_status === "NO_PICKUP") {
                  setSelectRow(props);
                  handleOpenDeliveryModal();
                } else {
                  errorMessage({
                    message: "You've already confirm this order!",
                    duration: 3000,
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      <MyModal
        isOpen={openDeliveryModel}
        onClose={handleOpenDeliveryModal}
        className="w-11/12 sm:w-2/5"
      >
        <div className="flex items-start justify-start flex-col gap-4 rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-md mb-2">
            {(data?.getShopWallet?.data?.total_balance ?? 0) >
            (selectRow?.total_price ?? 0)
              ? o("_modal_title1")
              : o("_modal_title2")}
          </h4>
          <p className="text-sm text-gray-500">
            {o("_modal_total_product")}: &nbsp;
            <span className="text-black">
              {selectRow?.total_products} &nbsp;products
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {o("_modal_total_quantity")}: &nbsp;
            <span className="text-black">
              {selectRow?.total_quantity}&nbsp;quantities
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {o("_modal_wallet_balance")}: &nbsp;
            <span className="text-black">
              ${data?.getShopWallet?.data?.total_balance.toFixed(2)}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {o("_modal_total_price")}: &nbsp;
            <span className="text-black">
              ${selectRow?.total_price.toFixed(2)}
            </span>
          </p>
          <div className="w-full flex items-center justify-end gap-4">
            <IconButton
              title={
                (data?.getShopWallet?.data?.total_balance ?? 0) >
                (selectRow?.total_price ?? 0)
                  ? o("_close_button")
                  : o("_recharge_button")
              }
              type="button"
              onClick={() =>
                (data?.getShopWallet?.data?.total_balance ?? 0) >
                (selectRow?.total_price ?? 0)
                  ? handleOpenDeliveryModal()
                  : handleNavigate()
              }
              className="rounded text-white bg-gray-500 w-auto text-xs hover:font-medium hover:shadow-md"
            />
            <IconButton
              type="button"
              isFront={true}
              title={o("_purchase_and_shopping")}
              icon={isLoading ? <Loading /> : ""}
              onClick={() => handlePurchaseAndShipping()}
              className="rounded bg-neon_pink text-white p-2 w-auto text-xs hover:font-medium hover:shadow-md"
            />
          </div>
        </div>
      </MyModal>
    </>
  );
}
