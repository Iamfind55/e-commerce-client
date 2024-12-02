"use client";

import React from "react";
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";
import StatusBadge from "@/components/status";
import HeadTable from "@/components/tableHeader";
import { calculateIndexPaginate } from "@/help/calculateIndexPaginate";
import { CancelIcon, FilterIcon, SaveIcon, SearchIcon } from "@/icons/page";
import { useFetchMyAppointment } from "@/lib/doctor/useFetchAppointment";
import useFilter from "@/lib/useFilter";
import { formatNumber } from "@/utils/formatNumber";
import {
  bookingHistoryColumns,
  booking_status,
  page_limits,
} from "@/utils/option";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/datePicker";
import Select from "@/components/select";
import IconButton from "@/components/iconButton";
import { formatTime } from "@/utils/timeCalculate";
import MyModal from "@/components/modal";
import Textfield from "@/components/textField";
import Loading from "@/components/loading";
import { useToast } from "@/utils/toast";
import { updateAPI } from "@/api/api";
import MessageHandler from "@/components/messageHandler";
import { isWithinTimeRange } from "@/utils/dateFormat";
import BookingHistoryCard from "@/components/bookingHistoryCard";
import BottomDrawer from "@/components/bottomDrawer";

export default function BookingHistoryPage() {
  const router = useRouter();
  const { errorMessage } = useToast();
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total, loading, refresh } = useFetchMyAppointment(filter);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [reason, setReason] = React.useState<string>("");
  const [response, setResponse] = React.useState<any>(null);
  const [id, setId] = React.useState<string>("");

  const handleOpenUpdateModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();
    setSearchTerm(newValue);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (newValue) {
        filterDispatch({ type: ACTION_TYPE.SEARCH, payload: newValue });
      } else {
        filterDispatch({ type: ACTION_TYPE.SEARCH, payload: "" });
      }
    }, 500);
  };

  const handleOffsetChange = (newOffset: number) => {
    filterDispatch({ type: ACTION_TYPE.OFFSET, payload: newOffset });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await updateAPI({
        url: "/appointments/" + id + "/cancel",
        body: {
          notes: reason,
        },
      });
      refresh();
      handleOpenUpdateModal();
      setResponse(res);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };

  return (
    <>
      <div className="flex items-start justify-start flex-col gap-4">
        <Breadcrumb path="Booking/history" />
        <div className="hidden sm:block bg-white rounded text-b_text p-4 w-full shadow-md">
          <h4 className="text-b_text text-sm mb-3 font-bold">
            List of all booking history:
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <Select
                name="number"
                title="Show"
                option={page_limits}
                className="h-8"
                value={filter?.offset}
                onChange={(e) => handleOffsetChange(e.target.value)}
              />
            </div>
            <div className="flex items-start justify-start py-3 gap-3">
              <div className="flex flex-col gap-1 lg:gap-4">
                <label className="text-b_text text-xs font-medium">
                  Search
                </label>
                <div className="-mt-4">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <SearchIcon size={16} />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="h-8 bg-gray300 border text-xs rounded block w-full ps-10 p-2 focus:outline-none focus:ring-1 "
                      placeholder="Search.."
                      required
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Select
                  name="status"
                  title="Status filter"
                  option={booking_status}
                  className="h-8"
                  value={filter.filter?.status}
                  onChange={(e) =>
                    filterDispatch({
                      type: ACTION_TYPE.STATUS,
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-start justify-start gap-4">
                <DatePicker
                  name="start_date"
                  title="Start Date"
                  className="h-8"
                  value={filter.start_date}
                  onChange={(e) =>
                    filterDispatch({
                      type: ACTION_TYPE.START_DATE,
                      payload: e.target.value,
                    })
                  }
                />
                <DatePicker
                  name="end_date"
                  title="End Date"
                  className="h-8"
                  value={filter.end_date}
                  onChange={(e) =>
                    filterDispatch({
                      type: ACTION_TYPE.END_DATE,
                      payload: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-y-auto overflow-x-auto h-auto">
            <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right border-t border-r border-l rounded">
              <HeadTable columns={bookingHistoryColumns} />
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-base">
                      Data is Loading....
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((row, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="text-xs border-b border-gray bg-white hover:bg-gray"
                        >
                          <td className="pl-2 py-4">
                            {calculateIndexPaginate({ filter, index })}
                          </td>
                          <td>
                            {row?.doctor?.firstName}&nbsp;
                            {row?.doctor?.lastName}
                          </td>
                          <td>{row?.date}</td>
                          <td>
                            {row?.startTime} - {row?.endTime}
                          </td>
                          <td>{formatTime(Number(row?.duration))}</td>
                          <td>{formatNumber(Number(row?.total))} Kip</td>
                          <td>
                            <StatusBadge status={row.status ?? ""} />
                          </td>
                          <td className="flex items-start justify-end gap-1 h-full pt-3">
                            {row?.status === "pending" && (
                              <button
                                type="button"
                                className={`${
                                  isWithinTimeRange(
                                    row?.date,
                                    row?.startTime,
                                    row?.endTime
                                  )
                                    ? ""
                                    : "cursor-not-allowed"
                                } text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 rounded-md text-xs px-4 py-2 text-center me-2 mb-2`}
                                onClick={() => {
                                  if (
                                    isWithinTimeRange(
                                      row?.date,
                                      row?.startTime,
                                      row?.endTime
                                    )
                                  ) {
                                    router.push(row?.consultations[0]?.url);
                                  }
                                }}
                                disabled={
                                  !isWithinTimeRange(
                                    row?.date,
                                    row?.startTime,
                                    row?.endTime
                                  )
                                }
                              >
                                Call
                              </button>
                            )}
                            <IconButton
                              className="rounded text-white bg-base w-auto text-xs"
                              isFront={true}
                              title="Detail"
                              onClick={() =>
                                router.push(
                                  "/client/doctor/" + row?.id + "/bill"
                                )
                              }
                            />
                            <button
                              type="button"
                              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none rounded-md text-xs px-4 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                              onClick={() => {
                                handleOpenUpdateModal();
                                setId(row?.id);
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No data from database!
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
          {total > filter.offset && (
            <div className="flex justify-between text-sm py-2 m-2">
              <p>
                Showing {filter.page} to {total} of {filter.offset} entries
              </p>
              <Pagination
                filter={filter}
                totalPage={total}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        <div className="block sm:hidden gap-2 rounded text-b_text w-full">
          <div className="flex items-center justify-between">
            <h4 className="text-b_text text-sm font-bold">
              List of all booking history:
            </h4>
            <button
              onClick={() => toggleOpenDrawer()}
              className="flex items-center justify-between"
            >
              <FilterIcon size={22} />
            </button>
          </div>
          {data && data.length > 0 ? (
            data.map((row, index: number) => {
              return (
                <BookingHistoryCard
                  key={index + 1}
                  id={row?.id}
                  doctor={row?.doctor?.firstName + " " + row?.doctor?.lastName}
                  date={row?.date}
                  startTime={row?.startTime}
                  endTime={row?.endTime}
                  total_time={row?.duration}
                  total_cost={row?.total}
                  status={row?.status}
                  onCall={() => {
                    if (
                      isWithinTimeRange(row?.date, row?.startTime, row?.endTime)
                    ) {
                      router.push(row?.consultations[0]?.url);
                    }
                  }}
                  onViewDetail={() =>
                    router.push("/client/doctor/" + row?.id + "/bill")
                  }
                  onCancel={() => {
                    handleOpenUpdateModal();
                    setId(row?.id);
                  }}
                />
              );
            })
          ) : (
            <div>Empty</div>
          )}
        </div>
      </div>

      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenUpdateModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-11/12 sm:w-2/5 md:inset-0 h-auto shadow"
      >
        <div className="rounded bg-white w-full p-4">
          <h4 className="text-b_text text-xs mb-3 font-bold">
            Could you briefly explain your reason for canceling? It helps us
            improve. Thank you.
          </h4>
          <form
            action=""
            className="w-full flex items-start justify-start flex-col gap-4"
            onSubmit={handleSubmitForm}
          >
            <Textfield
              name="reason"
              placeholder="Enter your reason...."
              id="name"
              title="Reason"
              required
              color="text-b_text"
              type="text"
              multiline={true}
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="w-1/2 flex items-center justify-start gap-4">
              <IconButton
                className="rounded text-base p-2 w-full border text-xs"
                icon={<CancelIcon size={18} className="text-error" />}
                isFront={true}
                type="button"
                title="Cancel"
                onClick={() => handleOpenUpdateModal()}
              />
              <IconButton
                className="rounded text-white p-2 bg-base w-full text-xs"
                icon={isLoading ? <Loading /> : <SaveIcon size={16} />}
                isFront={true}
                title={isLoading ? "Saving..." : "Save"}
                type="submit"
              />
            </div>
          </form>
          {response && <MessageHandler response={response} />}
        </div>
      </MyModal>

      <BottomDrawer
        isOpen={openDrawer}
        onClose={toggleOpenDrawer}
        title="OKARDCARE"
        icon={<CancelIcon size={24} />}
        className="w-full md:w-96 z-50"
      >
        <div className="flex items-start justify-start flex-col gap-2 rounded bg-gray-100 w-full px-4 pt-0 py-6 mb-16">
          <p className="text-sm rounded text-base font-medium">
            Easily find your booking history:
          </p>
          <div className="w-full flex flex-col gap-1 lg:gap-4">
            <label className="text-b_text text-xs font-medium">Search</label>
            <div>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon size={16} />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="h-8 bg-gray300 border text-xs rounded block w-full ps-10 p-2 focus:outline-none focus:ring-1 "
                  placeholder="Search.."
                  required
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <Select
            name="status"
            title="Status filter"
            option={booking_status}
            className="h-8"
            value={filter.filter?.status}
            onChange={(e) =>
              filterDispatch({
                type: ACTION_TYPE.STATUS,
                payload: e.target.value,
              })
            }
          />
          <DatePicker
            name="start_date"
            title="Start Date"
            className="h-8"
            value={filter.start_date}
            onChange={(e) =>
              filterDispatch({
                type: ACTION_TYPE.START_DATE,
                payload: e.target.value,
              })
            }
          />
          <DatePicker
            name="end_date"
            title="End Date"
            className="h-8"
            value={filter.end_date}
            onChange={(e) =>
              filterDispatch({
                type: ACTION_TYPE.END_DATE,
                payload: e.target.value,
              })
            }
          />
          <IconButton
            className="rounded text-white bg-secondary p-2 w-full mt-4 italic text-sm"
            icon={<SearchIcon />}
            isFront={true}
            type="button"
            title="Search now"
          />
        </div>
      </BottomDrawer>
    </>
  );
}
