import React from "react";
import { queryData } from "@/api/api";
import { IPublicAppointmentTypes } from "@/types/appointment";
import { FilterState } from "@/types/filter";

interface FetchAppointmentProps {
  id: string;
}

type NewIPublicAppointmentTypes = IPublicAppointmentTypes[];

const useFetchMyAppointment = (filter: FilterState) => {
  const [data, setData] = React.useState<NewIPublicAppointmentTypes>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchMyAppointment = async () => {
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
          filterObject.status = "pending";
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
      console.log(queryParams);
      console.log(filter);
      console.log(filter.filter?.status);

      const response = await queryData({
        url: `/appointments/me?${queryParams.toString()}`,
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
    fetchMyAppointment();
  };

  React.useEffect(() => {
    fetchMyAppointment();
  }, [filter]);

  return { data, total, loading, error, refresh };
};

const useFetchAppointmentById = ({ id }: FetchAppointmentProps) => {
  const [data, setData] = React.useState<IPublicAppointmentTypes>();
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchAppointment = async (props: { id: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await queryData({
        url: `/appointments/${props?.id}`,
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
    fetchAppointment({ id });
  };

  React.useEffect(() => {
    fetchAppointment({ id });
  }, [id]);

  return { data, total, loading, error, refresh };
};

export { useFetchAppointmentById, useFetchMyAppointment };
