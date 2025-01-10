import React from "react";

// api
import { useLazyQuery } from "@apollo/client";

// type and utils
import { QUERY_PRODUCTS } from "@/api/product";
import { GetProductsResponse, IFilter } from "@/types/product";

const useFetchProducts = ({ filter }: { filter: IFilter }) => {
  const { limit, page, brand_id, price_sort } = filter;

  console.log("Filter:", limit, page, brand_id, price_sort);

  const [getProducts, { data }] = useLazyQuery<GetProductsResponse>(
    QUERY_PRODUCTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const fetchProducts = () => {
    getProducts({
      variables: {
        orderBy: "created_at_DESC",
        limit: limit,
        page: page,
        where: {
          status: "ACTIVE",
          product_vip: 0,
          ...(brand_id && { brand_id: brand_id }),
        },
        // ...(price_sort && { sortedBy: price_sort }),
        sortedBy: price_sort ? price_sort : "price_DESC",
      },
    });
  };

  React.useEffect(() => {
    fetchProducts();
  }, [filter, getProducts]);

  return {
    getProducts,
    fetchProducts,
    data: data?.getProducts?.data?.map((product, index) => ({
      ...product,
      no: index + 1,
    })),
    total: data?.getProducts?.total,
  };
};

export default useFetchProducts;
