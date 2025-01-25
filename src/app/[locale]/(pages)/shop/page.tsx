"use client";

// components
import ShopCard from "@/components/shopCard";
import Breadcrumb from "@/components/breadCrumb";
import DropdownComponent from "@/components/dropdown";

// icons, utils, hooks
import EmptyPage from "@/components/emptyPage";
import useFilter from "./hooks/useFilter/page";
import ShopPagination from "./components/pagination";
import { FilterIcon, SearchIcon } from "@/icons/page";
import useFetchShops from "./hooks/useFetchShop";

const dropdownOptions = [
  { label: "VIP1", value: 1 },
  { label: "VIP2", value: 2 },
  { label: "VIP3", value: 3 },
  { label: "VIP4", value: 4 },
  { label: "VIP5", value: 5 },
];

export default function Shop() {
  const filter = useFilter();
  const fetchProducts = useFetchShops({ filter: filter.data });

  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "All shops", value: "/shop" },
            ]}
          />
          <div className="py-4">
            <div className="flex items-center justify-between p-2">
              <p className="text-gray-500 text-sm sm:text-xs">
                Total: {fetchProducts.total} Shops
              </p>

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
                      required
                      type="text"
                      id="simple-search"
                      placeholder="Search.."
                      onChange={(e) => {
                        filter.dispatch({
                          type: filter.ACTION_TYPE.KEYWORD,
                          payload: e.target.value,
                        });
                      }}
                      className="h-8 bg-white text-gray-500 border text-xs rounded block w-auto ps-10 p-2 focus:outline-none focus:ring-1"
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
                    <div
                      className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                      onClick={() => {
                        filter.dispatch({
                          type: filter.ACTION_TYPE.CREATED_DESC,
                          payload: "created_at_DESC",
                        });
                      }}
                    >
                      Newest
                    </div>
                    {dropdownOptions.map((option) => (
                      <div
                        key={option.label}
                        className="w-full flex items-start text-xs gap-2 text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                        onClick={() => {
                          filter.dispatch({
                            type: filter.ACTION_TYPE.SHOP_VIP,
                            payload: option.value,
                          });
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </DropdownComponent>
              </div>
            </div>

            {fetchProducts?.loading ? (
              <div className="w-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            ) : fetchProducts?.total ?? 0 > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2 sm:mx-0 mx-2">
                {fetchProducts?.data?.map((shop) => (
                  <div
                    key={shop.id}
                    className="flex items-center justify-center"
                  >
                    <ShopCard {...shop} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded w-full">
                <EmptyPage />
              </div>
            )}

            <div className="w-full flex items-end justify-end mb-4">
              <ShopPagination
                filter={filter.data}
                totalPage={Math.ceil(
                  (fetchProducts.total ?? 0) / filter.data.limit
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
      </div>
    </>
  );
}
