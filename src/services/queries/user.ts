import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserApi } from '../apis/auth';
import { useEffect } from 'react';
import { QUERY_KEY } from '@/lib/queryKeys';

export const useUser = (token: string | null) => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['user', { token }],
    queryFn: getUserApi,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      queryClient.setQueryData([QUERY_KEY.user], data);
    }
  }, [data, queryClient]);

  return {
    user: data ?? undefined,
    isError,
    isLoading,
    error,
  };
};
