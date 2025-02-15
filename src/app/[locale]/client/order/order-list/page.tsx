import React from "react";
import { useRouter } from "@/navigation";

// components
import Select from "@/components/select";
import MyModal from "@/components/modal";
import DatePicker from "@/components/datePicker";
import IconButton from "@/components/iconButton";
import Pagination from "@/components/pagination";
import { CloseEyeIcon, DeliveryIcon, SearchIcon } from "@/icons/page";

// utils
import useFilter from "../hooks/useFilter";
import StatusBadge from "@/components/status";
import { formatDate } from "@/utils/dateFormat";
import useFetchShopOrders from "../hooks/useFetch";
import { page_limits, stock } from "@/utils/option";
import EmptyPage from "@/components/emptyPage";
import { useTranslations } from "next-intl";

interface PropsDetails {
  status: string;
}

export default function OrderLists({ status }: PropsDetails) {
  const filter = useFilter();
  const router = useRouter();
  const t = useTranslations("order_page");
  const fetchShopOrders = useFetchShopOrders({ filter: filter.data });

  const [openDeliveryModel, setOpenDeliveryModel] =
    React.useState<boolean>(false);

  const handleOpenDeliveryModal = () => {
    setOpenDeliveryModel(!openDeliveryModel);
  };

  React.useEffect(() => {
    filter.dispatch({
      type: filter.ACTION_TYPE.ORDER_STATUS,
      payload: status ?? "",
    });
  }, []);

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
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleOpenDeliveryModal()}
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
          <h4 className="text-gray-500 text-md mb-3">
            Please purchase the corresponding product and ship it
          </h4>
          <p className="text-sm text-black">
            Product quantity purchased: &nbsp;
            <span className="text-gray-500">1</span>
          </p>
          <p className="text-sm text-black">
            Wallet balance: &nbsp;
            <span className="text-gray-500">$99.37</span>
          </p>
          <p className="text-sm text-black">
            To be paid: &nbsp;
            <span className="text-gray-500">$1665.53</span>&nbsp;&nbsp;
            {/* <span className="text-red-500">
              Check whether the account balance is sufficient
            </span> */}
          </p>
          <div className="w-full flex items-center justify-end gap-4">
            <IconButton
              title="Close"
              type="button"
              onClick={() => handleOpenDeliveryModal()}
              className="rounded text-white bg-gray-500 w-auto text-xs hover:font-medium hover:shadow-md"
            />
            <IconButton
              type="button"
              title="Purchase & Shipping"
              //   onClick={() => handleOpenDeliveryModal()}
              className="rounded bg-neon_pink text-white p-2 w-auto text-xs hover:font-medium hover:shadow-md"
            />
          </div>
        </div>
      </MyModal>
    </>
  );
}
