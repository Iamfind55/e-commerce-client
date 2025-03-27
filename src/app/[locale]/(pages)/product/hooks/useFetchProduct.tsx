import React from "react";

// api
import { useLazyQuery } from "@apollo/client";

// type and utils
import { QUERY_PRODUCTS } from "@/api/product";
import { GetProductsResponse, IFilter } from "@/types/product";

const useFetchProducts = ({ filter }: { filter: IFilter }) => {
  const { limit, page, price_between, category_id, brand_id, price_sort } =
    filter;

  // console.log(category_id)

  // Convert price_between to a string format if needed
  const modified = price_between
    ? `[${price_between.join(",")}]`
    : "[1,1000000]";

  // Convert the string back to an array of numbers
  const priceBetweenArray: [number, number] = JSON.parse(modified).map(
    (value: unknown) => {
      if (typeof value === "string") {
        return parseFloat(value);
      } else if (typeof value === "number") {
        return value;
      }
      throw new Error("Invalid type in price_between array");
    }
  );

  const [getProducts, { data, refetch, loading }] = useLazyQuery<GetProductsResponse>(
    QUERY_PRODUCTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const fetchProducts = () => {
    getProducts({
      variables: {
        limit: limit,
        page: page,
        where: {
          status: "ACTIVE",
          product_vip: 0,
          ...(price_between && { price_between: priceBetweenArray }),
          ...(brand_id && { brand_id: brand_id }),
          ...(category_id && { category_id: category_id }),
        },
        sortedBy: price_sort,
      },
    });
  };

  React.useEffect(() => {
    fetchProducts();
  }, [filter, getProducts]);

  return {
    getProducts,
    fetchProducts,
    loading,
    refetch,
    data: data?.getProducts?.data?.map((product, index) => ({
      ...product,
      no: index + 1,
    })),
    total: data?.getProducts?.total,
  };
};

export default useFetchProducts;
