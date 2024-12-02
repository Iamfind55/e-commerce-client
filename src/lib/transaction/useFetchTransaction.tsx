import React from "react";
import { FilterState } from "@/types/filter";
import { queryData } from "@/api/api";
import { ITransactionTypes } from "@/types/transaction";

type NewITransactionTypes = ITransactionTypes[];

const useFetchTransaction = (filter: FilterState) => {
  const [data, setData] = React.useState<NewITransactionTypes>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchTransaction = async () => {
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
        url: `/transactions/me?${queryParams.toString()}`,
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
    fetchTransaction();
  };

  React.useEffect(() => {
    fetchTransaction();
  }, [filter]);

  return { data, total, loading, error, refresh };
};

interface FetchBankProps {
  id: string;
}

const useFetchTransactionById = ({ id }: FetchBankProps) => {
  const [data, setData] = React.useState<ITransactionTypes>();
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchBank = async (props: { id: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await queryData({
        url: `/transactions/${props?.id}`,
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
    fetchBank({ id });
  };

  React.useEffect(() => {
    fetchBank({ id });
  }, [id]);

  return { data, total, loading, error, refresh };
};

export { useFetchTransaction, useFetchTransactionById };
