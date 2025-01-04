import React from "react";
import { useSelector } from "react-redux";

// api
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP_PRODUCTS } from "@/api/shop";

// type and utils
import { IFilter, ShopProduct } from "@/types/product";

interface FetchProductsResponse {
  getShopProducts: {
    data: ShopProduct[];
    total: number;
  };
}

const useFetchProducts = ({ filter }: { filter: IFilter }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [getShopProducts, { data }] = useLazyQuery<FetchProductsResponse>(
    QUERY_SHOP_PRODUCTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const { limit, page, status, keyword, createdAtBetween, category_id } =
    filter;
  const fetchProducts = () => {
    getShopProducts({
      variables: {
        orderBy: "created_at_DESC",
        limit: limit,
        page: page,
        where: {
          shop_id: user.id,
          ...(category_id && { category_id: category_id }),
          ...(status && { status: status }),
          ...(keyword && { keyword: keyword }),
          ...(createdAtBetween.startDate &&
            createdAtBetween.endDate && {
              createdAtBetween: {
                startDate: createdAtBetween.startDate,
                endDate: createdAtBetween.endDate,
              },
            }),
        },
      },
    });
  };

  React.useEffect(() => {
    fetchProducts();
  }, [filter, getShopProducts]);

  return {
    getShopProducts,
    fetchProducts,
    data: data?.getShopProducts?.data?.map((product, index) => ({
      ...product,
      no: index + 1,
    })),
    total: data?.getShopProducts?.total,
  };
};

export default useFetchProducts;
