import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCurrUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrUser;
