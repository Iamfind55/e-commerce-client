import React from "react";
import { QUERY_SHOPS } from "@/api/shop";
import { useLazyQuery } from "@apollo/client";
import { GetShopsResponse, IShopFilter } from "@/types/shop";

const useFetchShops = ({ filter }: { filter: IShopFilter }) => {
  const { limit, page, keyword, shop_vip, created_at_DESC } = filter;
  const [getShops, { data, loading }] = useLazyQuery<GetShopsResponse>(
    QUERY_SHOPS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const fetchShops = () => {
    getShops({
      variables: {
        orderBy: created_at_DESC ? created_at_DESC : "created_at_ASC",
        limit: limit,
        page: page,
        where: {
          status: "ACTIVE",
          ...(shop_vip && { shop_vip: shop_vip }),
          ...(keyword && { keyword: keyword }),
        },
      },
    });
  };

  React.useEffect(() => {
    fetchShops();
  }, [filter, getShops]);

  return {
    getShops,
    fetchShops,
    loading,
    data: data?.getShops?.data?.map((shop, index) => ({
      ...shop,
      no: index + 1,
    })),
    total: data?.getShops?.total,
  };
};

export default useFetchShops;
