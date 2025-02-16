"use client";

import React from "react";
import { useRouter } from "@/navigation";
import { useToast } from "@/utils/toast";
import Loading from "@/components/loading";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLazyQuery, useMutation } from "@apollo/client";

// components
import MyModal from "@/components/modal";
import IconButton from "@/components/iconButton";
import Breadcrumb from "@/components/breadCrumb";
import OrderCardComponent from "@/components/orderCard";

// type, utils and hooks
import useFilter from "../../hooks/useFilter";
import useFetchShopOrders from "../../hooks/useFetch";
import { GetShopWalletResponse } from "@/types/wallet";
import { GetShopOrderDetailResponse, IOrderData } from "@/types/order";

// icons
import { DeliveryIcon } from "@/icons/page";

// APIs
import { QUERY_SHOP_WALLET } from "@/api/wallet";
import {
  MUTATION_SHOP_CONFIRM_ORDER,
  QUERY_SHOP_ORDER_DETAILS,
} from "@/api/order";

export default function ShopOrderListDetails() {
  const params = useParams();
  const filter = useFilter();
  const router = useRouter();
  const t = useTranslations("order_page");
  const m = useTranslations("member_page");
  const { successMessage, errorMessage } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectRow, setSelectRow] = React.useState<IOrderData | null>(null);
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [openDeliveryModel, setOpenDeliveryModel] =
    React.useState<boolean>(false);

  const [shopConfirmOrder] = useMutation(MUTATION_SHOP_CONFIRM_ORDER);
  const fetchShopOrders = useFetchShopOrders({ filter: filter.data });
  const [shopGetOrderDetails, { data, loading }] =
    useLazyQuery<GetShopOrderDetailResponse>(QUERY_SHOP_ORDER_DETAILS, {
      fetchPolicy: "no-cache",
    });
  const [getShopWallet, { data: walletData }] =
    useLazyQuery<GetShopWalletResponse>(QUERY_SHOP_WALLET, {
      fetchPolicy: "no-cache",
    });

  const handleOpenDeliveryModal = () => {
    setOpenDeliveryModel(!openDeliveryModel);
  };

  const handleNavigate = () => {
    router.push("/client/wallet");
  };

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
      } else {
        errorMessage({
          message: res?.data?.shopConfirmOrder?.error?.details,
          duration: 3000,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      setSelectRow(null);
    }
  };

  React.useEffect(() => {
    filter.dispatch({
      type: filter.ACTION_TYPE.ORDER_NO,
      payload: id ?? "",
    });
  }, []);

  React.useEffect(() => {
    getShopWallet();
  }, [getShopWallet]);

  React.useEffect(() => {
    shopGetOrderDetails({
      variables: {
        where: {
          order_no: id,
        },
        limit: 100,
        page: 1,
        sortedBy: "created_at_DESC",
      },
    });
  }, [shopGetOrderDetails]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: m("_dashboard"), value: "/client" },
          { label: t("_order_list"), value: "/client/order" },
          {
            label: t("_order_list_detail"),
            value: "/client/order-list/order-id",
          },
        ]}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="text-sm text-gray-500 rounded p-4 bg-white mt-2">
          <div className="w-full flex items-center justify-between p-2">
            <p className="w-full">{t("_order_list_title")}</p>
            <div className="w-1/2 flex items-end justify-end">
              {fetchShopOrders?.data?.[0].order_status === "NO_PICKUP" && (
                <IconButton
                  className="rounded text-neon_pink p-2 w-auto text-sm italic border rounded"
                  icon={<DeliveryIcon size={18} />}
                  isFront={true}
                  type="button"
                  title={t("_immediate_delivery")}
                  onClick={() => {
                    setSelectRow(fetchShopOrders?.data?.[0] ?? null);
                    handleOpenDeliveryModal();
                  }}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 sm:mx-0 mx-2">
            {data?.shopGetOrderDetails?.data?.map((val, index) => (
              <OrderCardComponent {...val} key={index + 1} />
            ))}
          </div>
        </div>
      )}

      {/* Details modal */}
      <MyModal
        isOpen={openDeliveryModel}
        onClose={handleOpenDeliveryModal}
        className="w-11/12 sm:w-2/5"
      >
        <div className="flex items-start justify-start flex-col gap-4 rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-md mb-2">
            {(walletData?.getShopWallet?.data?.total_balance ?? 0) >
            (selectRow?.total_price ?? 0)
              ? t("_modal_title1")
              : t("_modal_title2")}
          </h4>
          <p className="text-sm text-gray-500">
            {t("_modal_total_product")}: &nbsp;
            <span className="text-black">
              {selectRow?.total_products} &nbsp;products
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {t("_modal_total_quantity")}: &nbsp;
            <span className="text-black">
              {selectRow?.total_quantity}&nbsp;quantities
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {t("_modal_wallet_balance")}: &nbsp;
            <span className="text-black">
              ${walletData?.getShopWallet?.data?.total_balance.toFixed(2)}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {t("_modal_total_price")}: &nbsp;
            <span className="text-black">
              ${selectRow?.total_price.toFixed(2)}
            </span>
          </p>
          <div className="w-full flex items-center justify-end gap-4">
            <IconButton
              title={
                (walletData?.getShopWallet?.data?.total_balance ?? 0) >
                (selectRow?.total_price ?? 0)
                  ? t("_close_button")
                  : t("_recharge_button")
              }
              type="button"
              onClick={() =>
                (walletData?.getShopWallet?.data?.total_balance ?? 0) >
                (selectRow?.total_price ?? 0)
                  ? handleOpenDeliveryModal()
                  : handleNavigate()
              }
              className="rounded text-white bg-gray-500 w-auto text-xs hover:font-medium hover:shadow-md"
            />
            <IconButton
              type="button"
              isFront={true}
              title={t("_purchase_and_shopping")}
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
