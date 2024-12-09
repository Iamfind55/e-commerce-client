"use client";
import Breadcrumb from "@/components/breadCrumb";
import DropdownComponent from "@/components/dropdown";
import ShopCard from "@/components/shopCard";
import { FilterIcon, SearchIcon } from "@/icons/page";

export default function Shop() {
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "shops", value: "/shop" },
            ]}
          />
          <div className="pt-4 pb-4">
            <div className="flex items-center justify-between p-2">
              <p className="text-gray-500">List of all shops (12394):</p>
              <div className="flex items-start justify-start gap-4">
                <div>
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <SearchIcon size={16} className="text-neon_pink" />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="h-8 bg-white text-base border text-xs rounded block w-auto ps-10 p-2 focus:outline-none focus:ring-1"
                      placeholder="Search.."
                      required
                    />
                  </div>
                </div>
                <DropdownComponent
                  className="w-56 cursor-pointer"
                  head={
                    <div>
                      <FilterIcon size={22} className="text-neon_pink" />
                    </div>
                  }
                >
                  <div
                    id="dropdownDivider"
                    className="py-4 flex items-start gap-2 flex-col"
                  >
                    <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                      Newest
                    </div>
                    <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                      VIP1
                    </div>
                    <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                      VIP2
                    </div>
                    <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                      VIP3
                    </div>
                    <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                      VIP4
                    </div>
                    <div className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4">
                      VIP5
                    </div>
                  </div>
                </DropdownComponent>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 flex items-center justify-center">
                  <ShopCard />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <ShopCard />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <ShopCard />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <ShopCard />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <ShopCard />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <ShopCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
