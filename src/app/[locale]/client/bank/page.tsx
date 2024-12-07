"use client";

import React from "react";
import Breadcrumb from "@/components/breadCrumb";
import {
  CancelIcon,
  EditIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  TrashIcon,
} from "@/icons/page";
import { useRouter } from "next/navigation";
import HeadTable from "@/components/tableHeader";
import { calculateIndexPaginate } from "@/help/calculateIndexPaginate";
import { useFetchBankByUserId } from "@/lib/bank/useFetchBank";
import useFilter from "@/lib/useFilter";
import Pagination from "@/components/pagination";
import { formatDate } from "@/utils/dateFormat";
import StatusBadge from "@/components/status";
import MyModal from "@/components/modal";
import { deleteAPI, updateAPI } from "@/api/api";
import { useToast } from "@/utils/toast";
import MessageHandler from "@/components/messageHandler";
import Textfield from "@/components/textField";
import { IBankTypes } from "@/types/bank";
import IconButton from "@/components/iconButton";
import Loading from "@/components/loading";
import DeleteModal from "@/components/deleteModal";
import { bankAccountColumns } from "@/utils/option";
import BankCard from "@/components/bankCard";

export default function BankAccounts() {
  const router = useRouter();
  const { errorMessage } = useToast();
  const [id, setId] = React.useState<string>("");
  const [response, setResponse] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total, loading, refresh } = useFetchBankByUserId(filter);
  const [updateData, setUpdateData] = React.useState<IBankTypes>({
    name: "",
    accountName: "",
    accountNumber: "",
  });

  const handleUpdateBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenUpdateModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const newValue = event.target.value.trim();
    // setSearchTerm(newValue);
    // if (typingTimeoutRef.current) {
    //   clearTimeout(typingTimeoutRef.current);
    // }
    // typingTimeoutRef.current = setTimeout(() => {
    //   if (newValue) {
    //     filterDispatch({ type: ACTION_TYPE.SEARCH, payload: newValue });
    //   } else {
    //     filterDispatch({ type: ACTION_TYPE.SEARCH, payload: "" });
    //   }
    // }, 500);
  };

  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  const handleDeleteBank = async () => {
    try {
      setIsLoading(true);
      const res = await deleteAPI({
        url: "/banks/" + id,
      });
      handleOpenModal();
      setResponse(res);
      refresh();
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateData?.accountNumber.includes("****")) {
      errorMessage({
        message: "Account number cannot contain ****",
        duration: 3000,
      });
      return;
    }
    try {
      setIsLoading(true);
      const res = await updateAPI({
        url: "/banks/" + updateData?.id,
        body: {
          name: updateData?.name,
          accountName: updateData?.accountName,
          accountNumber: updateData?.accountNumber,
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

  return (
    <div className="flex items-start justify-start flex-col gap-4">
      {/* <Breadcrumb path="Bank-accounts" /> */}
      <div className="bg-white rounded text-b_text p-4 w-full shadow-md">
        <div className="flex items-start justify-between">
          <h4 className="text-b_text text-sm mb-3 font-bold">
            List of all bank accounts:
          </h4>
          <button
            className="block sm:hidden py-1 px-3 border border-base rounded-lg text-b_text text-xs flex items-center justify-center gap-2"
            onClick={() => router.push("/client/bank/create")}
          >
            <PlusIcon size={16} className="text-base" />
            Create
          </button>
        </div>
        <div className="hidden sm:block w-full">
          <div className="flex justify-between py-3 gap-3">
            <div className="flex gap-1 lg:gap-4">
              <div>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon size={18} />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray300 border   text-sm rounded-lg block w-full ps-10 p-2 focus:outline-none focus:ring-1 "
                    placeholder="Search.."
                    required
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <button
                className="py-1 px-3 border border-base rounded-lg text-b_text text-xs flex items-center justify-center gap-2"
                onClick={() => router.push("/client/bank/create")}
              >
                <PlusIcon size={18} className="text-base" />
                Create
              </button>
            </div>
          </div>
          <div className="relative overflow-y-auto overflow-x-auto h-auto">
            <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
              <HeadTable columns={bankAccountColumns} />
              {loading ? (
                "Loading"
              ) : (
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((row, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray bg-white hover:bg-gray"
                        >
                          <td className="pl-2 py-4">
                            {calculateIndexPaginate({ filter, index })}
                          </td>
                          <td>{row?.name}</td>
                          <td>{row?.accountName}</td>
                          <td>{row?.accountNumber}</td>
                          <td>
                            <StatusBadge status={row.status ?? ""} />
                          </td>
                          <td>{formatDate(row?.createdAt ?? "")}</td>
                          <td className="flex items-start justify-start gap-3 h-full pt-3">
                            <EditIcon
                              size={20}
                              className="cursor-pointer hover:text-green-500"
                              onClick={() => {
                                handleOpenUpdateModal();
                                setUpdateData({
                                  id: row.id,
                                  name: row.name,
                                  accountName: row.accountName,
                                  accountNumber: row.accountNumber,
                                });
                              }}
                            />
                            <TrashIcon
                              size={18}
                              className="cursor-pointer hover:text-red-500"
                              onClick={() => {
                                handleOpenModal();
                                setId(row?.id ?? "");
                              }}
                            />
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
        <div className="block sm:hidden w-full flex items-start justify-start flex-col gap-4 mt-2">
          {data && data.length > 0 ? (
            data.map((row, index: number) => {
              return (
                <BankCard
                  key={index + 1}
                  name={row?.name}
                  accountName={row?.accountName}
                  accountNumber={row?.accountNumber}
                  createdAt={row?.createdAt}
                />
              );
            })
          ) : (
            <div className="text-b-text w-full text-center">
              No data from database!
            </div>
          )}
        </div>
      </div>

      {response && <MessageHandler response={response} />}

      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenUpdateModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/5 md:inset-0 h-auto shadow"
      >
        <div className="rounded shadow-md bg-white w-full p-4">
          <h4 className="text-b_text text-sm mb-3 font-bold">
            Update bank account info:
          </h4>
          <form
            action=""
            className="w-full flex items-start justify-start flex-col gap-4"
            onSubmit={handleSubmitForm}
          >
            <Textfield
              name="name"
              placeholder="Enter name...."
              id="name"
              title="Bank name"
              required
              color="text-b_text"
              type="text"
              value={updateData.name}
              onChange={handleUpdateBank}
            />
            <Textfield
              name="accountName"
              placeholder="Enter account name...."
              id="account_name"
              title="Account name"
              required
              color="text-b_text"
              type="text"
              value={updateData.accountName}
              onChange={handleUpdateBank}
            />
            <Textfield
              name="accountNumber"
              placeholder="Enter account number...."
              id="account"
              title="Account number"
              required
              color="text-b_text"
              type="text"
              value={updateData.accountNumber}
              onChange={handleUpdateBank}
            />
            <div className="w-full flex items-center justify-start gap-4">
              <IconButton
                className="rounded text-base p-2 w-full mt-4 border text-xs"
                icon={<CancelIcon />}
                isFront={true}
                type="button"
                title="Cancel"
                onClick={() => handleOpenUpdateModal()}
              />
              <IconButton
                className="rounded text-white p-2 bg-base w-full mt-4 text-xs"
                icon={isLoading ? <Loading /> : <SaveIcon size={16} />}
                isFront={true}
                title={isLoading ? "Saving..." : "Save change"}
                type="submit"
              />
            </div>
          </form>
          {response && <MessageHandler response={response} />}
        </div>
      </MyModal>

      <DeleteModal
        isOpen={isOpen}
        onClose={handleOpenModal}
        onConfirm={handleDeleteBank}
      />
    </div>
  );
}
