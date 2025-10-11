import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../user/useAuth";

export const useVerifyToken = () => {
  const { verifyToken } = useAuth();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["verify-token"],
    queryFn: verifyToken,
    retry: false, // 👈 prevents infinite retry on 401
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  return { data, isPending, isError, error };
};
