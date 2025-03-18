import {
  ContributionsEnum,
  CourseListResponseDto,
  FacultyListDto,
  GetPagedCoursesByInstitutionIdQuery,
  GetPagedCoursesQuery,
  GetPagedDepartmentsByFacultyIdQuery,
  GetPagedFacultiesByInstitutionIdQuery,
  IDepartmentsDto,
  InstitutionListDto,
  PagedQuery,
  StudyMaterialListDto,
} from '@/dto/courses';
import axiosInstance from '../axios';
import qs from 'query-string';
import { IMyUpload } from '@/dto/test';

export const GetCousesApi = async (
  query: GetPagedCoursesQuery
): Promise<CourseListResponseDto> => {
  const { page, size, searchterm } = query;
  const url = qs.stringifyUrl({
    url: `/courses/${searchterm ? 'search' : 'list'}`,
    query: {
      page,
      size,
      query: searchterm,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetPopularCoursesApi = async (
  query: GetPagedCoursesQuery
): Promise<CourseListResponseDto> => {
  const { page, size } = query;
  const url = qs.stringifyUrl({
    url: `/courses/popular-courses`,
    query: {
      page,
      size,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetMyUploadsdApi = async (
  query: GetPagedCoursesQuery
): Promise<{ myUploads: Array<IMyUpload>; hasNext: boolean }> => {
  const { page, size, searchterm } = query;
  const url = qs.stringifyUrl({
    url: `/uploads`,
    query: {
      page,
      size,
      query: searchterm,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetContributionsApi = async (): Promise<
  Record<ContributionsEnum, number>
> => {
  const url = qs.stringifyUrl({
    url: `/uploads/organisation/contributions`,
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetPopularStudyMaterialsApi = async (
  query: GetPagedCoursesQuery
): Promise<StudyMaterialListDto> => {
  const { page, size } = query;
  const url = qs.stringifyUrl({
    url: `/study-materials/popular?`,
    query: {
      page,
      size,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetCoursesByInstitutionIdApi = async (
  query: GetPagedCoursesByInstitutionIdQuery
): Promise<CourseListResponseDto> => {
  const { page, size, institutionId, searchQuery } = query;
  const url = qs.stringifyUrl({
    url: `/courses/institution/${institutionId}`,
    query: {
      page,
      size,
      searchQuery,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};
export const GetDepartmentsByFacultyIdApi = async (
  query: GetPagedDepartmentsByFacultyIdQuery
): Promise<IDepartmentsDto> => {
  const { page, size, facultyId } = query;
  const url = qs.stringifyUrl({
    url: `/departments/faculty/${facultyId}`,
    query: {
      page,
      size,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetInstitutionsApi = async (
  query: GetPagedCoursesQuery
): Promise<InstitutionListDto> => {
  const { page, size, searchterm } = query;
  const url = qs.stringifyUrl({
    url: `/institutions/${
      searchterm && searchterm?.length > 0 ? 'search' : 'list'
    }`,
    query: {
      page,
      size,
      query: searchterm,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetFacultiesApi = async (
  query: GetPagedCoursesQuery
): Promise<FacultyListDto> => {
  const { page, size, searchterm } = query;
  const url = qs.stringifyUrl({
    url: `/faculties/${searchterm ? 'search' : 'list'}`,
    query: {
      page,
      size,
      query: searchterm,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const GetFacultiesByInstitutionIdApi = async (
  query: GetPagedFacultiesByInstitutionIdQuery
): Promise<FacultyListDto> => {
  const { page, size, searchterm, institutionId } = query;
  const url = qs.stringifyUrl({
    url: `/faculties/university/${institutionId}`,
    query: {
      page,
      size,
      query: searchterm,
      universityId: institutionId,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};
