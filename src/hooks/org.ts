import { IOrgTeamMembersQuery, IUploadsSummaryQuery } from '@/dto/org';
import { QUERY_KEY } from '@/lib/queryKeys';
import {
  GetMyUploadsSummaryApi,
  GetOrgTeamMembersApi,
} from '@/services/apis/org';
import { useQuery } from '@tanstack/react-query';

export const useMyUploadsSummary = (params: IUploadsSummaryQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.summary, params],
    queryFn: () => GetMyUploadsSummaryApi(params),
  });

  return {
    summary: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useOrgTeamMembers = (params: IOrgTeamMembersQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.team_members, params],
    queryFn: () => GetOrgTeamMembersApi(params),
  });

  return {
    team_members: data?.content ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};
