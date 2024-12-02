import React from "react";
import { queryData } from "@/api/api";
import { IDoctorPublicTypes } from "@/types/doctor";

interface FetchDoctorProps {
  id: string;
}

const useFetchDoctorPublicById = ({ id }: FetchDoctorProps) => {
  const [data, setData] = React.useState<IDoctorPublicTypes>();
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchBank = async (props: { id: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await queryData({
        url: `/doctors/${props?.id}/public`,
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

export { useFetchDoctorPublicById };
