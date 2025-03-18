import {
  IAddQuestionParam,
  IIQuestionListResponseDto,
  ISubmissionTestAnalysis,
  ITestAnalysisDto,
  ITestAnalysisQuery,
  ITestAnalysisReq,
  ITestDto,
  ITestPerformanceAnalysisDto,
  ITestQuery,
  ITestResponseDto,
  ITestSummaryResponseDto,
} from '@/dto/test';
import axiosInstance from '../axios';
import qs from 'query-string';

export const CreateTestApi = async (params: Omit<ITestDto, 'id'>) => {
  return axiosInstance
    .post('/exams/create-exam', params)
    .then((response) => response.data);
};

export const UpdateTestApi = async (params: {
  exam: Omit<ITestDto, 'id'>;
  examId: number;
}) => {
  return axiosInstance
    .put(`/exams/edit/${params.examId}`, params.exam)
    .then((response) => response.data);
};
export const GetTestByIdApi = async (params: {
  examId: number;
}): Promise<ITestResponseDto> => {
  return axiosInstance
    .get(`/exams/${params.examId}`)
    .then((response) => response.data);
};

export const GetTestAnalysisByIdApi = async (params: {
  examId: number;
}): Promise<ITestAnalysisDto> => {
  return axiosInstance
    .get(`submit-test-analysis/${params.examId}/analysis`)
    .then((response) => response.data);
};

export const GetTestStatisticasById = async (query: {
  examId: number;
}): Promise<ISubmissionTestAnalysis> => {
  return axiosInstance
    .get(`submit-test-analysis/exam-statistics?examId=${query.examId}`)
    .then((response) => response.data);
};

export const GetTestSummaryAnalysisById = async (
  query: ITestAnalysisQuery
): Promise<ITestSummaryResponseDto> => {
  const { examId, page, size, seachQuery } = query;
  const url = qs.stringifyUrl({
    url: `/submit-test-analysis/response-summary`,
    query: {
      examId,
      page,
      size,
      seachQuery,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetTestQuestionsById = async (
  query: ITestQuery
): Promise<IIQuestionListResponseDto> => {
  const { examId, page, size } = query;
  const url = qs.stringifyUrl({
    url: `/questions/exam/${examId}`,
    query: {
      page,
      size,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetTestStudentByIdApi = async (params: {
  examId: number;
}): Promise<ITestResponseDto> => {
  return axiosInstance
    .get(`/exams/${params.examId}/students`)
    .then((response) => response.data);
};

export const GetTestTopPerformersByIdApi = async (params: {
  examId: number;
}): Promise<ITestResponseDto> => {
  return axiosInstance
    .get(`/exams/top-performers/${params.examId}`)
    .then((response) => response.data);
};

export const GetTestPerformanceAnalysisByIdApi = async (params: {
  examId: number;
}): Promise<ITestPerformanceAnalysisDto> => {
  return axiosInstance
    .get(`/exams/performance-analysis/${params.examId}`)
    .then((response) => response.data);
};

export const AddQuestionsListApi = async (params: IAddQuestionParam) => {
  return axiosInstance
    .post(`questions/add/${params.examId}`, params.questions)
    .then((response) => response.data);
};
