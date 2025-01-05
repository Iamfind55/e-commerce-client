import React from "react";

// api
import { useLazyQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "@/api/product";

// type and utils
import { IFilter, ProductData } from "@/types/product";

interface FetchProductsResponse {
  getProducts: {
    data: ProductData[];
    total: number;
  };
}

const useFetchProducts = ({ filter }: { filter: IFilter }) => {
  const { limit, page, product_vip } = filter;

  const [getProducts, { data, loading }] = useLazyQuery<FetchProductsResponse>(
    QUERY_PRODUCTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const fetchProducts = () => {
    getProducts({
      variables: {
        orderBy: "created_at_DESC",
        limit,
        page,
        where: {
          status: "ACTIVE",
          ...(product_vip && { product_vip }),
        },
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
    data: data?.getProducts?.data?.map((product, index) => ({
      ...product,
      no: index + 1,
    })),
    total: data?.getProducts?.total,
  };
};

export default useFetchProducts;
