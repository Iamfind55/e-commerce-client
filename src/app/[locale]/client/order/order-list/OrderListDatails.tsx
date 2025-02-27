import React from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

// components
import Select from "@/components/select";
import MyModal from "@/components/modal";
import Loading from "@/components/loading";
import StatusBadge from "@/components/status";
import EmptyPage from "@/components/emptyPage";
import DatePicker from "@/components/datePicker";
import IconButton from "@/components/iconButton";
import Pagination from "@/components/pagination";
import { CloseEyeIcon, DeliveryIcon, SearchIcon } from "@/icons/page";

// utils
import { useToast } from "@/utils/toast";
import { IOrderData } from "@/types/order";
import useFilter from "../hooks/useFilter";
import { page_limits } from "@/utils/option";
import { formatDate } from "@/utils/dateFormat";
import { QUERY_SHOP_WALLET } from "@/api/wallet";
import useFetchShopOrders from "../hooks/useFetch";
import { GetShopWalletResponse } from "@/types/wallet";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MUTATION_SHOP_CONFIRM_ORDER } from "@/api/order";

interface OrderListDetailProps {
  status?: string; // Make it optional to avoid type errors
}

const OrderListDetail: React.FC<OrderListDetailProps> = ({ status = "" }) => {
  const filter = useFilter();
  const router = useRouter();
  const t = useTranslations("order_page");
  const { successMessage, errorMessage } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [openDeliveryModel, setOpenDeliveryModel] =
    React.useState<boolean>(false);
  const [selectRow, setSelectRow] = React.useState<IOrderData | null>(null);

  const fetchShopOrders = useFetchShopOrders({ filter: filter.data });
  const [getShopWallet, { data }] = useLazyQuery<GetShopWalletResponse>(
    QUERY_SHOP_WALLET,
    {
      fetchPolicy: "no-cache",
    }
  );
  const [shopConfirmOrder] = useMutation(MUTATION_SHOP_CONFIRM_ORDER);

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
      type: filter.ACTION_TYPE.ORDER_STATUS,
      payload: status ?? "",
    });
  }, []);

  React.useEffect(() => {
    getShopWallet();
  }, [getShopWallet]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
        <div className="w-full sm:w-2/5 flex items-start justify-start gap-2 mt-2 sm:mt-0">
          <div className="w-1/2">
            <Select
              name="stock"
              title={t("_show")}
              option={page_limits}
              className="h-8"
              onChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.LIMIT,
                  payload: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="w-full sm:w-3/5 flex flex-col sm:flex-row mt-2 sm:mt-0 items-end justify-start gap-2">
          <div className="relative w-full border rounded">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon size={16} className="text-neon_pink" />
            </div>
            <input
              required
              type="text"
              id="search"
              placeholder={t("_search")}
              onChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.ORDER_NO,
                  payload: e.target.value,
                });
              }}
              className="h-8 bg-white text-gray-500 text-xs rounded ps-10 p-2 focus:outline-none focus:ring-1"
            />
          </div>
          <DatePicker
            name="start_date"
            title={t("_start_date")}
            className="h-8"
            value={filter.state.createdAtBetween.startDate ?? ""}
            onChange={(e) => {
              filter.dispatch({
                type: filter.ACTION_TYPE.CREATED_AT_START_DATE,
                payload: e.target.value,
              });
            }}
          />
          <DatePicker
            name="end_date"
            title={t("_end_date")}
            className="h-8"
            value={filter.state.createdAtBetween.endDate ?? ""}
            onChange={(e) => {
              filter.dispatch({
                type: filter.ACTION_TYPE.CREATED_AT_END_DATE,
                payload: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="w-full h-auto mt-6">
        <div className="w-full hidden sm:block">
          {fetchShopOrders.total ?? 0 > 0 ? (
            <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right border rounded">
              <thead className="sticky top-0 bg-gray text-xs bg-white">
                <tr className="border-b border-gray text-left">
                  <th scope="col" className="py-3 pl-1">
                    {t("_id")}
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    {t("_order_no")}
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    {t("_total_product")}
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    {t("_total_quantity")}
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    {t("_toal_price")}
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    {t("_payment_status")}
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    {t("_order_status")}
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    {t("_date")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-1 flex items-center justify-center"
                  >
                    {t("_action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchShopOrders?.data?.map((order, index) => (
                  <tr
                    key={order.id + index}
                    className="border-b border-gray bg-white hover:bg-gray py-6 text-gray-500"
                  >
                    <td className="pl-2 py-4">{index + 1}</td>
                    <td className="pl-2 py-4">{order?.order_no}</td>
                    <td className="pl-2 py-4 text-center">
                      {order?.total_products}
                    </td>
                    <td>
                      <p className="text-xs text-center">
                        {order.total_quantity}
                      </p>
                    </td>
                    <td className="text-xs">${order.total_price}</td>
                    <td className="text-xs">
                      <StatusBadge status={order.payment_status} />
                    </td>
                    <td className="text-xs">
                      <StatusBadge status={order.order_status} />
                    </td>
                    <td className="text-xs">{formatDate(order.created_at)}</td>
                    <td className="pl-2 py-4 flex items-center justify-center gap-4">
                      <CloseEyeIcon
                        size={18}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() =>
                          router.push(`order/order-list/${order?.order_no}`)
                        }
                      />
                      <DeliveryIcon
                        size={18}
                        className={`${
                          order.order_status === "NO_PICKUP"
                            ? "cursor-pointer hover:text-red-500"
                            : "cursor-not-allowed opacity-50"
                        }`}
                        onClick={() => {
                          if (order.order_status === "NO_PICKUP") {
                            setSelectRow(order);
                            handleOpenDeliveryModal();
                          } else {
                            errorMessage({
                              message: "You've already confirm this order!",
                              duration: 3000,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyPage />
          )}
        </div>
      </div>
      <div className="w-full flex items-end justify-end mb-4">
        <Pagination
          filter={filter.data}
          totalPage={Math.ceil(
            (fetchShopOrders.total ?? 0) / filter.data.limit
          )}
          onPageChange={(e) => {
            filter.dispatch({
              type: filter.ACTION_TYPE.PAGE,
              payload: e,
            });
          }}
        />
      </div>

      {/* Details modal */}
      <MyModal
        isOpen={openDeliveryModel}
        onClose={handleOpenDeliveryModal}
        className="w-11/12 sm:w-2/5"
      >
        <div className="flex items-start justify-start flex-col gap-4 rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-md mb-2">
            {(data?.getShopWallet?.data?.total_balance ?? 0) >
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
              ${data?.getShopWallet?.data?.total_balance.toFixed(2)}
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
                (data?.getShopWallet?.data?.total_balance ?? 0) >
                (selectRow?.total_price ?? 0)
                  ? t("_close_button")
                  : t("_recharge_button")
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
};

export default OrderListDetail;
