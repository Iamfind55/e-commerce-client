import React from "react";
import moment from "moment";

// api
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP_PRODUCTS } from "@/api/shop";

// type and utils
import { GetShopProductsResponse, IShopProductFilter } from "@/types/shop";

const useFetchShopProducts = ({ filter }: { filter: IShopProductFilter }) => {
  const { limit, page, keyword, quantity, createdAtBetween, sortedBy } = filter;

  const [getShopProducts, { data, loading }] =
    useLazyQuery<GetShopProductsResponse>(QUERY_SHOP_PRODUCTS, {
      fetchPolicy: "no-cache",
    });

  const specificDate = moment(createdAtBetween?.startDate);
  const last60Days = specificDate.subtract(60, "days").format("YYYY-MM-DD");

  console.log("Sorted BY:", sortedBy);
  const fetchShopProducts = () => {
    getShopProducts({
      variables: {
        limit: limit,
        page: page,
        ...(sortedBy && { sortedBy: sortedBy }),
        where: {
          status: "ACTIVE",
          shop_id: "2023676a-5e57-4cb5-a076-18f16b951439",
          ...(keyword && { keyword: keyword }),
          ...(quantity && { quantity: quantity }),
          ...(createdAtBetween?.startDate && {
            createdAtBetween: {
              startDate: last60Days,
              endDate: createdAtBetween.startDate,
            },
          }),
        },
      },
    });
  };

  React.useEffect(() => {
    fetchShopProducts();
  }, [filter, getShopProducts]);

  console.log("Data:", data);

  return {
    getShopProducts,
    fetchShopProducts,
    loading,
    data: data?.getShopProducts?.data?.map((shop, index) => ({
      ...shop,
      no: index + 1,
    })),
    total: data?.getShopProducts?.total,
  };
};

export default useFetchShopProducts;
