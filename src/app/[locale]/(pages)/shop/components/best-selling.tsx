import React from "react";

// components
import Pagination from "@/components/pagination";
import ShopProductCard2 from "@/components/shopProductCard2";

// hooks for query and filter products
import EmptyPage from "@/components/emptyPage";
import useFetchShopProducts from "../hooks/useFetchShopProduct/page";
import useShopProductFilter from "../hooks/useFilterShopProduct/page";

export default function ShopHomeComponent() {
  const filter = useShopProductFilter();
  const fetchShopProducts = useFetchShopProducts({ filter: filter.data });

  React.useEffect(() => {
    filter.dispatch({
      type: filter.ACTION_TYPE.SORTED_BY,
      payload: "sell_count_DESC",
    });
  }, []);

  console.log(fetchShopProducts);

  return (
    <>
      <div>
        <div className="container">
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              New arrival products:
            </p>
            {fetchShopProducts?.loading ? (
              "Loading..."
            ) : fetchShopProducts?.total || 0 > 0 ? (
              <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
                {fetchShopProducts?.data?.map((product, index) => (
                  <ShopProductCard2 key={index + 1} {...product} />
                ))}
              </div>
            ) : (
              <div className="rounded w-full">
                <EmptyPage />
              </div>
            )}

            <div className="w-full flex items-center justify-center mb-4">
              <Pagination
                filter={filter.data}
                totalPage={Math.ceil(
                  (fetchShopProducts.total ?? 0) / filter.data.limit
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
