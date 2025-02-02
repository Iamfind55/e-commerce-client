import React from "react";
import moment from "moment";
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP_PRODUCTS } from "@/api/shop";
import { GetShopProductsResponse, IShopProductFilter } from "@/types/shop";

const useFetchShopProducts = ({ filter }: { filter: IShopProductFilter }) => {
  const {
    limit,
    page,
    keyword,
    quantity,
    createdAtBetween,
    sortedBy,
    shop_id,
  } = filter;
  const [getShopProducts, { data, loading }] =
    useLazyQuery<GetShopProductsResponse>(QUERY_SHOP_PRODUCTS, {
      fetchPolicy: "no-cache",
    });

  const specificDate = moment(createdAtBetween?.startDate);
  const last60Days = specificDate.subtract(60, "days").format("YYYY-MM-DD");

  const fetchShopProducts = () => {
    getShopProducts({
      variables: {
        limit: limit,
        page: page,
        ...(sortedBy && { sortedBy: sortedBy }),
        where: {
          status: "ACTIVE",
          ...(shop_id && { shop_id: shop_id }),
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
