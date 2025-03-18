import {
  IIQuestionListResponseDto,
  ISubmissionTestAnalysis,
  ITestAnalysisDto,
  ITestAnalysisQuery,
  ITestQuery,
  ITestResponseDto,
  ITestSummaryResponseDto,
} from '@/dto/test';
import { QUERY_KEY } from '@/lib/queryKeys';
import {
  GetTestAnalysisByIdApi,
  GetTestByIdApi,
  GetTestQuestionsById,
  GetTestStatisticasById,
  GetTestSummaryAnalysisById,
} from '@/services/apis/test';
import { useQuery } from '@tanstack/react-query';

export const useGetTestById = (params: { examId: number }) => {
  const { data, isError, isLoading, isFetching, error } =
    useQuery<ITestResponseDto>({
      queryKey: [QUERY_KEY.test_by_id, params.examId],
      queryFn: () => GetTestByIdApi(params),
    });

  return {
    test: data ?? undefined,
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useTestAnalysisById = (params: { examId: number }) => {
  const { data, isError, isLoading, isFetching, error } =
    useQuery<ITestAnalysisDto>({
      queryKey: [QUERY_KEY.test_analysis_by_id, params.examId],
      queryFn: () => GetTestAnalysisByIdApi(params),
    });

  return {
    test_analysis: data ?? undefined,
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useTestStatisticasById = (params: { examId: number }) => {
  const { data, isError, isLoading, isFetching, error } =
    useQuery<ISubmissionTestAnalysis>({
      queryKey: [QUERY_KEY.test_statistics, params.examId],
      queryFn: () => GetTestStatisticasById(params),
    });

  return {
    test_statistics: data ?? undefined,
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useTestResponseSummaryById = (params: ITestAnalysisQuery) => {
  const { data, isError, isLoading, isFetching, error } =
    useQuery<ITestSummaryResponseDto>({
      queryKey: [QUERY_KEY.test_response_summary, params],
      queryFn: () => GetTestSummaryAnalysisById(params),
    });

  return {
    test_response_summary: data?.content ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useQuestionsByExamId = (params: ITestQuery) => {
  const { data, isError, isLoading, isFetching, error } =
    useQuery<IIQuestionListResponseDto>({
      queryKey: [QUERY_KEY.questions_by_id, params],
      queryFn: () => GetTestQuestionsById(params),
    });

  return {
    questions_by_id: data?.content ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};
