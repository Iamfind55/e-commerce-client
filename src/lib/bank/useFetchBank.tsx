import React from "react";
import { IBankTypes } from "@/types/bank";
import { FilterState } from "@/types/filter";
import { queryData } from "@/api/api";

type NewIBankTypes = IBankTypes[];

const useFetchBanks = (filter: FilterState) => {
  const [data, setData] = React.useState<NewIBankTypes>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchBanks = async () => {
    setLoading(true);
    setError(null);
    try {
      const buildQueryFilter = (filter: any) => {
        const params = new URLSearchParams({
          page: filter.page.toString(),
          offset: filter.offset.toString(),
          sort_by: filter.sort_by,
          order_by: filter.order_by,
        });
        if (filter.start_date) {
          params.append("start_date", filter.start_date);
        }
        if (filter.end_date) {
          params.append("end_date", filter.end_date);
        }
        if (filter.filter) {
          const filterParts = Object.keys(filter.filter).reduce(
            (acc: string[], key) => {
              const value = filter.filter[key];
              if (value !== undefined && value !== null && value !== "") {
                acc.push(`${key}:${value}`);
              }
              return acc;
            },
            []
          );

          if (filterParts.length > 0) {
            params.append("filter", filterParts.join(","));
          }
        }
        return params.toString();
      };

      const queryParams = buildQueryFilter(filter);

      const response = await queryData({
        url: `/banks?${queryParams.toString()}`,
      });
      if (response.status === 200) {
        const data = await response.data;
        setData(data);
        setTotal(response.total);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchBanks();
  };
  React.useEffect(() => {
    fetchBanks();
  }, [filter]);

  return { data, total, loading, error, refresh };
};

const useFetchBankByUserId = (filter: FilterState) => {
  const [data, setData] = React.useState<NewIBankTypes>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchBank = async () => {
    setLoading(true);
    setError(null);
    try {
      const buildQueryFilter = (filter: any) => {
        const params = new URLSearchParams({
          page: filter.page.toString(),
          offset: filter.offset.toString(),
          sort_by: filter.sort_by,
          order_by: filter.order_by,
        });

        // Add default status filter if not provided
        const filterObject = { ...filter.filter };
        if (!filterObject.status) {
          filterObject.status = "active"; // default status
        }

        if (filter.start_date) {
          params.append("start_date", filter.start_date);
        }
        if (filter.end_date) {
          params.append("end_date", filter.end_date);
        }
        if (filterObject) {
          const filterParts = Object.keys(filterObject).reduce(
            (acc: string[], key) => {
              const value = filterObject[key];
              if (value !== undefined && value !== null && value !== "") {
                acc.push(`${key}:${value}`);
              }
              return acc;
            },
            []
          );

          if (filterParts.length > 0) {
            params.append("filter", filterParts.join(","));
          }
        }
        return params.toString();
      };

      const queryParams = buildQueryFilter(filter);

      const response = await queryData({
        url: `/banks/me?${queryParams.toString()}`,
      });
      if (response.status === 200) {
        const data = await response.data;
        setData(data);
        setTotal(response.total);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchBank();
  };

  React.useEffect(() => {
    fetchBank();
  }, [filter]);

  return { data, total, loading, error, refresh };
};

export { useFetchBanks, useFetchBankByUserId };
