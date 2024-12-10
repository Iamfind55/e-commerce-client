"use client";
import Breadcrumb from "@/components/breadCrumb";
import DropdownComponent from "@/components/dropdown";
import ShopCard from "@/components/shopCard";
import { FilterIcon, SearchIcon } from "@/icons/page";
const shops = [
  {
    href: "/shop/shop-2",
    altText: "Shop 2 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-2",
    altText: "Shop 2 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-3",
    altText: "Shop 3 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-4",
    altText: "Shop 4 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-5",
    altText: "Shop 5 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-6",
    altText: "Shop 6 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-7",
    altText: "Shop 7 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-8",
    altText: "Shop 8 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
  {
    href: "/shop/shop-9",
    altText: "Shop 9 Image",
    shopName: "Shop Two",
    description: "This is the second shop",
    rating: 4.8,
  },
];

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
          <div className="py-4">
            <div className="flex items-center justify-between p-2">
              <p className="text-gray-500 text-sm sm:text-xs">(12394) Shops</p>
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
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {shops.map((shop, index) => (
                <div
                  key={index + 1}
                  className="flex items-center justify-center"
                >
                  <ShopCard
                    href={shop.href}
                    altText={shop.altText}
                    shopName={shop.shopName}
                    description={shop.description}
                    rating={shop.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
