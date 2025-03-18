import qs from 'query-string';
import axiosInstance from '../axios';
import {
  CreateStudyMaterialDto,
  PagedQuery,
  StudyMaterialListDto,
} from '@/dto/courses';
import { ILesson } from '@/dto/test';

export const GetOrgStudyMaterialsApi = async (
  query: PagedQuery
): Promise<StudyMaterialListDto> => {
  const { page, size } = query;
  const url = qs.stringifyUrl({
    url: `/study-materials/user/list`,
    query: {
      page,
      size,
    },
  });
  return axiosInstance.get(url).then((response) => response.data);
};

export const CreateStudyMaterialApi = async (
  params: Omit<CreateStudyMaterialDto, 'id'>
) => {
  return axiosInstance
    .post('/study-materials/add', params)
    .then((response) => response.data);
};

export const AddStudyMaterialLessonsListApi = async (params: {
  lessons: ILesson[];
  studyMaterialId: string;
}) => {
  return axiosInstance
    .post(`/lessons/add/${params.studyMaterialId}`, params.lessons)
    .then((response) => response.data);
};
