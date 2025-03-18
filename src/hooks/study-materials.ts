import { PagedQuery } from '@/dto/courses';
import { QUERY_KEY } from '@/lib/queryKeys';
import { GetOrgStudyMaterialsApi } from '@/services/apis/study-materials';
import { useQuery } from '@tanstack/react-query';

export const useOrgStudyMaterials = (params: PagedQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.org_study_materials],
    queryFn: () => GetOrgStudyMaterialsApi(params),
  });

  return {
    org_study_materials: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};
