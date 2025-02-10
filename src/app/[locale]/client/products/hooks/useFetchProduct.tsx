import React from "react";
import { useSelector } from "react-redux";

// api
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP_PRODUCTS } from "@/api/shop";

// type and utils
import { IFilter, ShopProduct } from "@/types/product";

interface FetchShopProductsResponse {
  getShopProducts: {
    data: ShopProduct[];
    total: number;
  };
}

const useFetchShopProducts = ({ filter }: { filter: IFilter }) => {
  const { user } = useSelector((state: any) => state.auth);
  const {
    limit,
    page,
    shopProductStatus,
    status,
    keyword,
    createdAtBetween,
    category_id,
  } = filter;

  console.log(
    limit,
    page,
    shopProductStatus,
    status,
    keyword,
    createdAtBetween,
    category_id
  );

  const [getShopProducts, { data }] = useLazyQuery<FetchShopProductsResponse>(
    QUERY_SHOP_PRODUCTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const fetchShopProducts = () => {
    getShopProducts({
      variables: {
        orderBy: "created_at_DESC",
        limit: limit,
        page: page,
        where: {
          shop_id: user.id,
          ...(category_id && { category_id: category_id }),
          ...(status && { status: status }),
          ...(shopProductStatus && { shopProductStatus: shopProductStatus }),
          ...(keyword && { keyword: keyword }),
          ...(createdAtBetween?.startDate &&
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
    fetchShopProducts();
  }, [filter, getShopProducts]);

  return {
    getShopProducts,
    fetchShopProducts,
    data: data?.getShopProducts?.data?.map((product, index) => ({
      ...product,
      no: index + 1,
    })),
    total: data?.getShopProducts?.total,
  };
};

export default useFetchShopProducts;
