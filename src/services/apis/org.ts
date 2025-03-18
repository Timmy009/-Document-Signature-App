import queryString from 'query-string';
import axiosInstance from '../axios';
import {
  IInviteTeamMemberDto,
  IOrgTeamMembersListResponse,
  IOrgTeamMembersQuery,
  IUploadsSummaryQuery,
  IUploadSummary,
} from '@/dto/org';

export const GetMyUploadsSummaryApi = async (
  query: IUploadsSummaryQuery
): Promise<Array<IUploadSummary>> => {
  const { organisationId, period, from, to } = query;
  const url = queryString.stringifyUrl({
    url: `/uploads/summary`,
    query: {
      to: to ? to.toISOString() : '',
      from: from ? from.toISOString() : '',
      organisationId: organisationId,
      period: period,
    },
  });
  return await axiosInstance.get(url).then((response) => response.data);
};

export const GetOrgTeamMembersApi = async (
  query: IOrgTeamMembersQuery
): Promise<IOrgTeamMembersListResponse> => {
  const { organisationId, status, page, size } = query;
  const url = queryString.stringifyUrl({
    url: `/teams/${organisationId}/members`,
    query: {
      status: status,
      size: size,
      page: page,
    },
  });
  return await axiosInstance.get(url).then((response) => response.data);
};

export const AdminInviteTeamMemberApi = async (
  param: IInviteTeamMemberDto
): Promise<{ message: string }> => {
  return await axiosInstance
    .post('/teams/invite', param)
    .then((response) => response.data);
};
