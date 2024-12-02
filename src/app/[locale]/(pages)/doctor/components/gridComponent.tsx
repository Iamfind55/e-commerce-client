"use client";
import React from "react";
import DoctorCard from "@/components/doctorCard";
import EmptyPage from "@/components/emptyPage";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CancelIcon,
  FilterIcon,
  SearchIcon,
} from "@/icons/page";
import { countries } from "@/utils/option";
import { useFetchDoctors } from "@/lib/doctor/useFetchDoctor";
import useFilter from "@/lib/useFilter";
import Select from "@/components/select";
import BottomDrawer from "@/components/bottomDrawer";
import IconButton from "@/components/iconButton";
import { useFetchSpecialists } from "@/lib/specialist/useFetchSpecialist";

export default function GridComponent() {
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, loading, total } = useFetchDoctors(filter);
  const { data: specialistDatas } = useFetchSpecialists(filter);
  console.log(specialistDatas);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [showMore, setShowMore] = React.useState(false);
  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedItems, setSelectedItems] = React.useState(new Set());

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
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

  const handleCheck = (id: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      if (newSelectedItems.has(id)) {
        newSelectedItems.delete(id);
      } else {
        newSelectedItems.add(id);
      }
      return newSelectedItems;
    });
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start w-full gap-4">
        {/* laptop filter  */}
        <div className="bg-white h-[auto] w-full sm:w-1/4 p-0 sm:p-4 hidden sm:flex flex-row sm:flex-col items-start justify-start gap-2">
          <p className="text-sm rounded text-base font-medium">
            Easily find the right doctor by:
          </p>
          <div className="w-full flex flex-col gap-1 lg:gap-4 mt-2">
            <div>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon size={16} className="text-secondary" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="h-8 bg-white text-base border text-xs rounded block w-full ps-10 p-2 focus:outline-none focus:ring-1"
                  placeholder="Search.."
                  required
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="border rounded w-full">
            <div className="bg-white rounded">
              <p className="text-sm p-2 rounded text-base text-xs font-medium">
                Urgent:
              </p>
            </div>
            <div className="flex items-start justify-start flex-col text-b_text pl-4">
              <div className="flex items-center mb-2">
                <input
                  id="routine"
                  type="radio"
                  value=""
                  name="urgent"
                  className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
                />
                <label
                  htmlFor="routine"
                  className="ms-2 text-xs text-gray_color"
                >
                  Routine
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="emergency"
                  type="radio"
                  value=""
                  name="urgent"
                  className="w-3 h-3 text-b_text bg-secondary border-secondary rounded checked:bg-red-500"
                />
                <label
                  htmlFor="emergency"
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
              <p className="text-sm p-2 rounded text-base text-xs font-medium">
                Expertise on:
              </p>
            </div>
            <div className="px-4 pt-0 pb-4">
              <ul className="flex items-start justify-center flex-col gap-1 text-b_text">
                {(showMore ? specialistDatas : specialistDatas.slice(0, 2)).map(
                  (item) => (
                    <li
                      key={item.id}
                      className="text-xs cursor-pointer text-gray_color hover:text-base hover:text-xs flex items-center"
                      onClick={() => handleCheck(item.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => handleCheck(item.id)}
                        className="mr-2"
                      />
                      {item.name}
                    </li>
                  )
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
              <p className="text-sm p-2 rounded text-base text-xs font-medium">
                Gender:
              </p>
            </div>
            <div className="px-4 pt-0 pb-4">
              <div className="flex items-start justify-center flex-col text-b_text">
                <div className="flex items-center mb-2">
                  <input
                    id="male"
                    type="radio"
                    value=""
                    name="gender"
                    className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
                  />
                  <label
                    htmlFor="male"
                    className="ms-2 text-xs text-gray_color cursor-pointer"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="female"
                    type="radio"
                    value=""
                    name="gender"
                    className="w-3 h-3 text-b_text bg-secondary border-secondary rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="female"
                    className="ms-2 text-xs text-gray_color cursor-pointer"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded w-full">
            <div className="bg-white rounded">
              <p className="text-sm p-2 rounded text-base text-xs font-medium">
                Experiences:
              </p>
            </div>
            <div className="px-4 pt-0 pb-4">
              <div className="flex items-start justify-center flex-col">
                <div className="flex items-center mb-2">
                  <input
                    id="two-years"
                    type="radio"
                    value=""
                    name="experience"
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded"
                  />
                  <label
                    htmlFor="two-years"
                    className="ms-2 text-xs text-gray_color cursor-pointer"
                  >
                    2 Years
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="five-years"
                    type="radio"
                    value=""
                    name="experience"
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="five-years"
                    className="ms-2 text-xs text-gray_color cursor-pointer"
                  >
                    5 Years
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="ten-years"
                    type="radio"
                    value=""
                    name="experience"
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="ten-years"
                    className="ms-2 text-xs text-gray_color cursor-pointer"
                  >
                    10 Years
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="more-then-tens"
                    type="radio"
                    value=""
                    name="experience"
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded checked:bg-red-500"
                  />
                  <label
                    htmlFor="more-then-tens"
                    className="ms-2 text-xs text-gray_color cursor-pointer"
                  >
                    More than 10 years
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile filter  */}
        <div className="w-full block sm:hidden flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1 lg:gap-4">
            {/* <label className="text-b_text text-xs font-medium">Search</label> */}
            <div>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon size={16} className="text-secondary" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="h-8 bg-white text-base border text-xs rounded block w-full ps-10 p-2 focus:outline-none focus:ring-1"
                  placeholder="Search.."
                  required
                  //   value={searchTerm}
                  //   onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <FilterIcon
            size={26}
            className="text-base"
            onClick={() => toggleOpenDrawer()}
          />
        </div>
        <div className="w-full sm:w-3/4">
          <div className="w-full grid grid-cols-2 gap-2 sm:gap-3 mb-4 grid-cols-2 lg:grid-cols-4">
            {data && data.length > 0 ? (
              data.map((row, index: number) => {
                return (
                  <div key={index + 1}>
                    <DoctorCard
                      id={row?.id}
                      //   profile={row?.profile}
                      profile="/images/default-image.webp"
                      firstName={row?.firstName}
                      lastName={row?.lastName}
                      gender={row?.gender}
                      experience={row?.experience}
                      address1={row?.address1}
                      link="/client/doctor/"
                    />
                  </div>
                );
              })
            ) : (
              <EmptyPage />
            )}
            <DoctorCard
              id="dsfgdsfgdsfgds"
              profile="/images/doctor-01.jpg"
              firstName="Paokue"
              lastName="Saolong"
              gender="Male"
              experience="10 years"
              address1="Vientiane Capital of Laos"
              link="/client/doctor/"
            />
            <DoctorCard
              id="dsfgdsfgdsfgds"
              profile="/images/doctor-01.jpg"
              firstName="Paokue"
              lastName="Saolong"
              gender="Male"
              experience="10 years"
              address1="Vientiane Capital of Laos"
              link="/client/doctor/"
            />
            <DoctorCard
              id="dsfgdsfgdsfgds"
              profile="/images/doctor-01.jpg"
              firstName="Paokue"
              lastName="Saolong"
              gender="Male"
              experience="10 years"
              address1="Vientiane Capital of Laos"
              link="/client/doctor/"
            />
            <DoctorCard
              id="dsfgdsfgdsfgds"
              profile="/images/doctor-01.jpg"
              firstName="Paokue"
              lastName="Saolong"
              gender="Male"
              experience="10 years"
              address1="Vientiane Capital of Laos"
              link="/client/doctor/"
            />
            <DoctorCard
              id="dsfgdsfgdsfgds"
              profile="/images/doctor-01.jpg"
              firstName="Paokue"
              lastName="Saolong"
              gender="Male"
              experience="10 years"
              address1="Vientiane Capital of Laos"
              link="/client/doctor/"
            />
            <DoctorCard
              id="dsfgdsfgdsfgds"
              profile="/images/doctor-01.jpg"
              firstName="Paokue"
              lastName="Saolong"
              gender="Male"
              experience="10 years"
              address1="Vientiane Capital of Laos"
              link="/client/doctor/"
            />
            <DoctorCard
              id="dsfgdsfgdsfgds"
              profile="/images/doctor-01.jpg"
              firstName="Paokue"
              lastName="Saolong"
              gender="Male"
              experience="10 years"
              address1="Vientiane Capital of Laos"
              link="/client/doctor/"
            />
          </div>
          <div className="w-full text-center">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Previous
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-secondary dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <BottomDrawer
        isOpen={openDrawer}
        onClose={toggleOpenDrawer}
        title="OKARDCARE"
        icon={<CancelIcon size={24} />}
        className="w-full md:w-96 z-50"
      >
        <div className="flex items-start justify-start flex-col gap-2 rounded bg-gray-100 w-full px-4 pt-0 pb-4 mb-16">
          <p className="text-sm rounded text-base font-medium mt-2">
            Easily find the right doctor by:
          </p>
          <div className="border rounded w-full">
            <div className="bg-white rounded">
              <p className="text-sm p-2 rounded text-base text-xs font-medium">
                Urgent:
              </p>
            </div>
            <div className="px-4 py-1 flex items-center justify-start gap-6">
              <div className="flex items-center mb-2">
                <input
                  id="free-doctor"
                  type="radio"
                  value=""
                  className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
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
                  className="w-3 h-3 text-b_text bg-secondary border-secondary rounded checked:bg-red-500"
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
              <p className="text-sm p-2 rounded text-base text-xs font-medium">
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
                    className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
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
                    className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
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
                        className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
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
                        className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
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
          <div className="flex items-start justify-between border w-full rounded gap-4">
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
                    className="w-3 h-3 text-b_text bg-secondary border-secondary rounded"
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
                    className="w-3 h-3 text-b_text bg-secondary border-secondary rounded checked:bg-red-500"
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
                    className="w-3 h-3 text-b_text bg-secondary border-secondary rounded checked:bg-red-500"
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
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded"
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
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded checked:bg-red-500"
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
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded checked:bg-red-500"
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
                    className="w-3 h-3 text-gray_color bg-secondary border-secondary rounded checked:bg-red-500"
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
            className="rounded text-white bg-secondary p-2 w-full italic text-sm"
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
