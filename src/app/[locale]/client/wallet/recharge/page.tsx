"use client";

import Image from "next/image";

// components
import Select from "@/components/select";
import StatusBadge from "@/components/status";
import Pagination from "@/components/pagination";
import Breadcrumb from "@/components/breadCrumb";
import DatePicker from "@/components/datePicker";

// icons, hooks and utils
import TransactionCard from "@/components/trasactionCard";
import useFilter from "../../products/hooks/useFilter/page";
import { page_limits, transaction_status } from "@/utils/option";
import useFetchProducts from "../../products/hooks/useFetchProduct";

export default function RechargeHistory() {
  const filter = useFilter();
  const fetchShopProduct = useFetchProducts({ filter: filter.data });
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Wallet management", value: "/wallet" },
          { label: "Recharge History", value: "/wallet/recharge" },
        ]}
      />
      <div className="w-full bg-white mt-2 rounded flex items-end justify-end flex-col gap-2 text-gray-500 p-1 sm:p-4">
        <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-2">
          <div className="flex items-start justify-start gap-2">
            <Select
              name="number"
              title="Show number"
              option={page_limits}
              className="h-8"
              // onChange={(e) => {
              //   filter.dispatch({
              //     type: filter.ACTION_TYPE.STATUS,
              //     payload: e.target.value,
              //   });
              // }}
            />
            <div className="block sm:hidden">
              <Select
                name="status"
                title="Status"
                option={transaction_status}
                className="h-8"
                // onChange={(e) => {
                //   filter.dispatch({
                //     type: filter.ACTION_TYPE.STATUS,
                //     payload: e.target.value,
                //   });
                // }}
              />
            </div>
          </div>
          <div className="flex items-end justify-start gap-2">
            <div className="hidden sm:block ">
              <Select
                name="status"
                title="Status"
                option={transaction_status}
                className="h-8"
                // onChange={(e) => {
                //   filter.dispatch({
                //     type: filter.ACTION_TYPE.STATUS,
                //     payload: e.target.value,
                //   });
                // }}
              />
            </div>
            <DatePicker
              name="start_date"
              title="Start date"
              className="h-8"
              // value={filter.state.createdAtBetween.startDate ?? ""}
              // onChange={(e) => {
              //   filter.dispatch({
              //     type: filter.ACTION_TYPE.CREATED_AT_START_DATE,
              //     payload: e.target.value,
              //   });
              // }}
            />
            <DatePicker
              name="end_date"
              title="End date"
              className="h-8"
              // value={filter.state.createdAtBetween.endDate ?? ""}
              // onChange={(e) => {
              //   filter.dispatch({
              //     type: filter.ACTION_TYPE.CREATED_AT_END_DATE,
              //     payload: e.target.value,
              //   });
              // }}
            />
          </div>
        </div>
        <div className="w-full mt-4 hidden sm:block">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right border rounded">
            <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
              <tr className="border-b border-gray text-left">
                <th scope="col" className="py-3 pl-1">
                  No
                </th>
                <th scope="col" className="py-3 pl-1">
                  Amount
                </th>
                <th scope="col" className="py-3 pl-1">
                  Received amount
                </th>
                <th scope="col" className="py-3 pl-1">
                  Voucher
                </th>
                <th scope="col" className="py-3 pl-1">
                  Status
                </th>
                <th scope="col" className="py-3 pl-1">
                  Method
                </th>
                <th scope="col" className="py-3 pl-1">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {products.map((product) => ( */}
              <tr className="border-b text-xs border-gray bg-white hover:bg-gray py-6">
                <td className="pl-2 py-4">1</td>
                <td className="pl-2 py-4">$4,150.00</td>
                <td className="pl-2 py-4">$4,190.00</td>
                <td>
                  <div className="flex items-start justify-start gap-4">
                    <Image
                      className="rounded"
                      src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
                      alt="Voucher"
                      width={60}
                      height={60}
                    />
                  </div>
                </td>
                <td>
                  <StatusBadge status="completed" />
                </td>
                <td>BTC Conversion rate : $1.00</td>
                <td>2024-08-18 10:21:55</td>
              </tr>
              <tr className="border-b text-xs border-gray bg-white hover:bg-gray py-6">
                <td className="pl-2 py-4">2</td>
                <td className="pl-2 py-4">$4,150.00</td>
                <td className="pl-2 py-4">$4,190.00</td>
                <td>
                  <div className="flex items-start justify-start gap-4">
                    <Image
                      className="rounded"
                      src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
                      alt="Voucher"
                      width={60}
                      height={60}
                    />
                  </div>
                </td>
                <td>
                  <StatusBadge status="completed" />
                </td>
                <td>BTC Conversion rate : $1.00</td>
                <td>2024-08-18 10:21:55</td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
          <div className="flex items-start justify-end py-4 gap-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchShopProduct.total ?? 0) / filter.data.limit
              )}
              onPageChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.PAGE,
                  payload: e,
                });
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4 block sm:hidden">
          <div className="w-full flex items-start jusitfy-start gap-2 flex-col">
            <TransactionCard
              date="2024-08-18 10:21:55"
              status="completed"
              title="BTC Conversion rate : $1.00"
              amount="$4,150.00"
              receive_amount="$4,190.00"
              image="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
            />
            <TransactionCard
              date="2024-08-18 10:21:55"
              status="completed"
              title="BTC Conversion rate : $1.00"
              amount="$4,150.00"
              receive_amount="$4,190.00"
              image="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
            />
          </div>
          <div className="flex items-start justify-center py-2 gap-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchShopProduct.total ?? 0) / filter.data.limit
              )}
              onPageChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.PAGE,
                  payload: e,
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
