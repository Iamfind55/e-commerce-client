"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";
import HeadTable from "@/components/tableHeader";
import { calculateIndexPaginate } from "@/help/calculateIndexPaginate";
import {
  CalendarIcon,
  CloseEyeIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
} from "@/icons/page";
import { useFetchDoctors } from "@/lib/doctor/useFetchDoctor";
import useFilter from "@/lib/useFilter";
import { countries, doctorColumns, gender, page_limits } from "@/utils/option";
import Image from "next/image";
import Select from "@/components/select";
import GridComponent from "@/app/(pages)/doctor/components/gridComponent";

export default function Doctor() {
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, loading, total } = useFetchDoctors(filter);
  const [isGrid, setIsGrid] = React.useState<boolean>(true);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  const handleOffsetChange = (newOffset: number) => {
    filterDispatch({ type: ACTION_TYPE.OFFSET, payload: newOffset });
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

  return (
    <div>
      <div className="flex items-center justify-between px-4">
        <Breadcrumb path="Doctor/doctor detail" />
        <div className="hidden sm:block">
          {isGrid ? (
            <ListIcon
              size={18}
              className="text-base cursor-pointer"
              onClick={() => setIsGrid(false)}
            />
          ) : (
            <GridIcon
              size={18}
              className="text-base cursor-pointer"
              onClick={() => setIsGrid(true)}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-auto w-full p-0 sm:p-2 items-start justify-start flex-col gap-3 overflow-auto mt-4">
          {loading ? "Loading...." : isGrid && <GridComponent />}
          {!isGrid && (
            <>
              <div className="bg-white w-full relative overflow-y-auto overflow-x-auto h-auto p-3">
                <h4 className="text-b_text text-sm mb-3 font-bold">
                  List of all our expert doctors:
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    {/* <Select
                      name="number"
                      title="Show"
                      option={page_limits}
                      className="h-8"
                      value={filter?.offset}
                      onChange={(e) => handleOffsetChange(e.target.value)}
                    /> */}
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
                  </div>
                  <div className="flex items-start justify-start py-3 gap-2">
                    <div>
                      <Select
                        name="country"
                        title="Country"
                        option={countries}
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
                    <div>
                      <Select
                        name="expertise"
                        title="Expertise"
                        option={countries}
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
                    <div>
                      <Select
                        name="gender"
                        title="Gender"
                        option={gender}
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
                    <div>
                      <Select
                        name="experiences"
                        title="Experiences"
                        option={countries}
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
                  </div>
                </div>
                <table className="border px-2 text-gray_color w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right mt-2">
                  <HeadTable columns={doctorColumns} />
                  {loading ? (
                    "Loading"
                  ) : (
                    <tbody>
                      {data &&
                        data.length > 0 &&
                        data.map((row, index: number) => {
                          return (
                            <tr
                              key={index}
                              className="border-b border-gray bg-white hover:bg-gray text-gray_color px-2"
                            >
                              <td className="pl-2 py-4">
                                {calculateIndexPaginate({ filter, index })}
                              </td>
                              <td className="py-1">
                                <Link href={`/client/doctor/` + row?.id}>
                                  <div className="relative">
                                    <Image
                                      className="rounded-full border"
                                      // src={
                                      //   !row.profile
                                      //     ? "/images/default-image.webp"
                                      //     : row?.profile
                                      // }
                                      src="/images/default-image.webp"
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                                  </div>
                                </Link>
                              </td>
                              <td>
                                <p className="flex">
                                  {row?.firstName} &nbsp; {row?.lastName}
                                </p>
                              </td>
                              <td>{row?.gender}</td>
                              <td>{row?.address1 ?? "vientiane of Laos"}</td>
                              <td>
                                {row?.experience ?? "10 Years of experiences"}
                              </td>
                              <td className="flex items-center justify-start gap-2 pt-3">
                                <Link
                                  href={`${row?.link}/${row.id}/book`}
                                  className="w-auto bg-secondary text-white flex items-center justify-center px-2 py-1 text-xs text-center rounded focus:outline-none"
                                >
                                  <CalendarIcon />
                                  &nbsp;Book
                                </Link>
                                <Link
                                  href={`${row?.link}/${row.id}`}
                                  className="w-auto border border-secondary rounded flex items-center justify-center px-3 py-1 mt-0 text-xs text-center text-base rounded focus:outline-none"
                                >
                                  <CloseEyeIcon />
                                  &nbsp; Detail
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  )}
                </table>
              </div>
              <div>
                {total > filter.offset && (
                  <div className="flex justify-between text-sm py-2 m-2">
                    <p>
                      Showing {filter.page} to {total} of {filter.offset}{" "}
                      entries
                    </p>
                    <Pagination
                      filter={filter}
                      totalPage={total}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
