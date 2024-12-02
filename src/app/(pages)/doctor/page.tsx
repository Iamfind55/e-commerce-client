"use client";
import React from "react";
import DoctorCard from "@/components/doctorCard";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CancelIcon,
  FilterIcon,
  SearchIcon,
} from "@/icons/page";
import Select from "@/components/select";
import { countries } from "@/utils/option";
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import BottomDrawer from "@/components/bottomDrawer";
import useFilter from "@/lib/useFilter";
import { useFetchDoctors } from "@/lib/doctor/useFetchDoctor";
import EmptyPage from "@/components/emptyPage";
import ListPlaceholderSkeleton from "@/components/ListPlaceholderSkeleton";

export default function DoctorPage() {
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, loading } = useFetchDoctors(filter);
  const [showMore, setShowMore] = React.useState(false);
  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  console.log(data);
  return (
    <>
      <div className="container mx-auto px-4 mt-4 mb-4">
        <div className="flex items-center justify-center flex-col my-3 sm:my-6">
          <h1 className="text-md sm:text-lg text-base font-bold">
            Meet Our Expert Medical Professionals
          </h1>
          {openDrawer === false && (
            <TypeAnimation
              sequence={[
                "List of our esteemed doctors.",
                1000,
                "Our expert healthcare team.",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{
                fontSize: window.innerWidth < 768 ? "0.8em" : "1em", // Adjust font size based on screen width
                display: "inline-block",
                color: "#05696b",
                zIndex: 10,
                background: "white",
                padding: "0.5rem 1rem",
              }}
              repeat={Infinity}
            />
          )}
        </div>
        <div className="flex items-start justify-between sm:mt-6">
          <div className="h-auto w-full sm:w-3/4 p-0 sm:p-4 items-start justify-start flex-col gap-3 overflow-auto">
            {/* filter for mobile  */}
            <div className="block sm:hidden flex items-center justify-end gap-2">
              <Textfield
                name="search"
                placeholder="Search...."
                id="search"
                title="Search doctor"
                required
                color="text-b_text"
              />
              <FilterIcon
                size={26}
                className="text-base"
                onClick={() => toggleOpenDrawer()}
              />
            </div>
            {loading ? (
              <div className="flex items-center justify-center sm:justify-between gap-2">
                <ListPlaceholderSkeleton className="hidden sm:block" />
                <ListPlaceholderSkeleton className="hidden sm:block" />
                <ListPlaceholderSkeleton className="hidden sm:block" />
                <ListPlaceholderSkeleton />
              </div>
            ) : (
              <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 py-2 mb-4 grid-cols-2 lg:grid-cols-3">
                {data && data.length > 0 ? (
                  data.map((row, index: number) => {
                    return (
                      <div key={index + 1} className="text-base">
                        <DoctorCard
                          id={row?.id}
                          profile={row?.profile}
                          firstName={row?.firstName}
                          lastName={row?.lastName}
                          gender={row?.gender}
                          bio={row?.bio}
                          address1={row?.address1}
                          link="/doctor"
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="border w-full flex items-center justify-center">
                    <EmptyPage />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* filter  */}
          {data && data.length > 0 ? (
            <div className="h-[auto] w-full sm:w-1/4 p-0 sm:p-4 hidden sm:flex flex-row sm:flex-col items-start justify-start gap-4">
              <p className="text-sm rounded text-base font-medium mt-2">
                Easily find the right doctor by:
              </p>
              <Textfield
                name="search"
                placeholder="Search...."
                id="search"
                title="Search doctor"
                required
                color="text-b_text"
              />
              <div className="border rounded w-full">
                <div className="bg-white rounded">
                  <p className="text-sm p-2 rounded text-base font-medium">
                    Urgent:
                  </p>
                </div>
                <div>
                  <div className="flex items-start justify-around text-b_text">
                    <div className="flex items-center mb-2">
                      <input
                        id="free-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="free-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        Routine
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="unavailable-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                      />
                      <label
                        htmlFor="unavailable-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        Emergency
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <Select
                name="country"
                title="Country"
                option={countries}
                required
                className="text-base h-7.5"
              />
              <div className="border rounded w-full">
                <div className="bg-white rounded">
                  <p className="text-sm p-2 rounded text-base font-medium">
                    Expertise on:
                  </p>
                </div>
                <div className="py-1 px-4">
                  <ul className="flex items-start justify-center flex-col gap-1 text-b_text">
                    <li className="text-xs cursor-pointer text-gray_color hover:text-base hover:text-xs">
                      Destinations
                    </li>
                    <li className="text-xs cursor-pointer text-gray_color hover:text-base hover:text-xs">
                      Echo and X-ray
                    </li>
                    {showMore && (
                      <>
                        <li className="text-xs cursor-pointer text-gray_color hover:text-base hover:text-xs">
                          Destinations
                        </li>
                        <li className="text-xs cursor-pointer text-gray_color hover:text-base hover:text-xs">
                          Echo and X-ray
                        </li>
                      </>
                    )}
                  </ul>
                  <button
                    className="w-full mt-4 text-xs text-gray_color cursor-pointer flex items-center justify-center gap-1"
                    onClick={toggleShowMore}
                  >
                    {showMore ? "See less" : "See more"}&nbsp;
                    {showMore ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </button>
                </div>
              </div>
              <div className="border rounded w-full">
                <div className="bg-white rounded">
                  <p className="text-sm p-2 rounded text-base font-medium">
                    Gender:
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-center flex-col text-b_text">
                    <div className="flex items-center mb-2">
                      <input
                        id="free-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="free-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="unavailable-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                      />
                      <label
                        htmlFor="unavailable-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        Female
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="unavailable-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                      />
                      <label
                        htmlFor="unavailable-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        No preference
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border rounded w-full">
                <div className="bg-white rounded">
                  <p className="text-sm p-2 rounded text-base font-medium">
                    Experiences:
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-center flex-col">
                    <div className="flex items-center mb-2">
                      <input
                        id="free-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="free-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        2 Years
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="unavailable-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                      />
                      <label
                        htmlFor="unavailable-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        3 Years
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="unavailable-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                      />
                      <label
                        htmlFor="unavailable-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        5 Years
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="unavailable-doctor"
                        type="radio"
                        value=""
                        className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                      />
                      <label
                        htmlFor="unavailable-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        More than 5 years
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <BottomDrawer
        isOpen={openDrawer}
        onClose={toggleOpenDrawer}
        title="OKARDCARE"
        icon={<CancelIcon size={24} />}
        className="w-full md:w-96 z-50"
      >
        <div className="flex items-start justify-start flex-col gap-2 rounded bg-gray-100 w-full p-4">
          <p className="text-sm rounded text-base font-medium mt-2">
            Easily find the right doctor by:
          </p>
          <div className="border rounded w-full">
            <div className="bg-white rounded">
              <p className="text-sm p-2 rounded text-base font-medium">
                Urgent:
              </p>
            </div>
            <div className="px-4 py-1">
              <div className="flex items-center mb-2">
                <input
                  id="free-doctor"
                  type="radio"
                  value=""
                  className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                />
                <label
                  htmlFor="free-doctor"
                  className="ms-2 text-xs text-gray_color"
                >
                  Routine
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="unavailable-doctor"
                  type="radio"
                  value=""
                  className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                />
                <label
                  htmlFor="unavailable-doctor"
                  className="ms-2 text-xs text-gray_color"
                >
                  Emergency
                </label>
              </div>
            </div>
          </div>
          <Select
            name="country"
            title="Country"
            option={countries}
            required
            className="text-base h-7.5"
          />
          <div className="border rounded w-full">
            <div className="bg-white rounded">
              <p className="text-sm p-2 rounded text-base font-medium">
                Expertise on:
              </p>
            </div>
            <div className="py-1 px-4">
              <ul className="flex items-start justify-center flex-col gap-1 text-b_text">
                <div className="flex items-center mb-2">
                  <input
                    id="free-doctor"
                    type="checkbox"
                    value=""
                    className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="free-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    Destinations
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="free-doctor"
                    type="checkbox"
                    value=""
                    className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="free-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    Echo and X-ray
                  </label>
                </div>
                {showMore && (
                  <>
                    <div className="flex items-center mb-2">
                      <input
                        id="free-doctor"
                        type="checkbox"
                        value=""
                        className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="free-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        ພະຍາດຍິງ
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="free-doctor"
                        type="checkbox"
                        value=""
                        className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="free-doctor"
                        className="ms-2 text-xs text-gray_color"
                      >
                        ພະຍາດຕິດຕໍ່ທາງເພດສໍາພັນ
                      </label>
                    </div>
                  </>
                )}
              </ul>
              <button
                className="w-full mt-4 text-xs text-gray_color cursor-pointer flex items-center justify-center gap-1"
                onClick={toggleShowMore}
              >
                {showMore ? "See less" : "See more"}&nbsp;
                {showMore ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </button>
            </div>
          </div>
          <div className="flex items-start justify-between border w-full rounded">
            <div className="rounded w-full">
              <div className="bg-white rounded">
                <p className="text-xs px-2 rounded text-base font-medium">
                  Gender:
                </p>
              </div>
              <div className="flex items-start justify-center flex-col text-b_text p-2">
                <div className="flex items-center mb-2">
                  <input
                    id="free-doctor"
                    type="radio"
                    value=""
                    className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="free-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="unavailable-doctor"
                    type="radio"
                    value=""
                    className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="unavailable-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="unavailable-doctor"
                    type="radio"
                    value=""
                    className="w-3 h-3 text-b_text bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="unavailable-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    No preference
                  </label>
                </div>
              </div>
            </div>
            <div className="rounded w-full">
              <div className="bg-white rounded">
                <p className="text-xs px-2 rounded text-base font-medium">
                  Experiences:
                </p>
              </div>
              <div className="flex items-start justify-center flex-col p-2">
                <div className="flex items-center mb-2">
                  <input
                    id="free-doctor"
                    type="radio"
                    value=""
                    className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="free-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    2 Years
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="unavailable-doctor"
                    type="radio"
                    value=""
                    className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="unavailable-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    3 Years
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="unavailable-doctor"
                    type="radio"
                    value=""
                    className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="unavailable-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    5 Years
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="unavailable-doctor"
                    type="radio"
                    value=""
                    className="w-3 h-3 text-gray_color bg-gray-100 border-gray-300 rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="unavailable-doctor"
                    className="ms-2 text-xs text-gray_color"
                  >
                    More than 5 years
                  </label>
                </div>
              </div>
            </div>
          </div>
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
