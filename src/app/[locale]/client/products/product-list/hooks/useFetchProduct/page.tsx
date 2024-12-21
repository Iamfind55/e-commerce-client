import { QUERY_SHOP_PRODUCTS } from "@/api/shop";
import { IFilter, IproductTypes } from "@/types/product";
import { useLazyQuery } from "@apollo/client";
import React from "react";

interface FetchProductsResponse {
  getProducts: {
    data: IproductTypes[];
    total: number;
  };
}

const useFetchProducts = ({ filter }: { filter: IFilter }) => {
  const [getProducts, { data }] = useLazyQuery<FetchProductsResponse>(
    QUERY_SHOP_PRODUCTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const {
    limit,
    page,
    status,
    keyword,
    brand_id,
    category_id,
    product_vip,
    product_top,
    price_between,
  } = filter;

  const fetchProducts = () => {
    getProducts({
      variables: {
        orderBy: "created_at_DESC",
        limit: limit,
        page: page,
        where: {
          ...(status && { status: status }),
          ...(keyword && { keyword: keyword }),
          ...(brand_id && { brand_id: brand_id }),
          ...(category_id && { category_id: category_id }),
          ...(product_vip && { product_vip: product_vip }),
          ...(product_top && { product_top: product_top }),
          ...(price_between && { price_between: price_between }),
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
    data: data?.getProducts?.data?.map((product, index) => ({
      ...product,
      no: index + 1,
    })),
    total: data?.getProducts?.total,
  };
};

export default useFetchProducts;
