import { IUser } from './user';
import { PagedQuery } from './courses';

export interface IUploadsSummaryQuery {
  organisationId: number;
  period:
    | 'TODAY'
    | 'THIS_WEEK'
    | 'LAST_WEEK'
    | 'THIS_MONTH'
    | 'LAST_MONTH'
    | 'THIS_YEAR'
    | 'LAST_YEAR'
    | 'CUSTOM';
  from?: Date;
  to?: Date;
}

export interface IUploadSummary {
  testViews: number;
  materialsViews: number;
  totalViews: number;
  createdAt: string;
  from: string;
  to: string;
}

export interface IInviteTeamMemberDto {
  email: string;
  fullName: string;
  organisationId: number;
  role: 'STUDENT' | 'TUTOR' | 'ADMIN';
}

export interface IInviteTeamMemberResponseDto {
  id: number;
  organisation: IUser;
  invitationStatus: 'PENDING' | 'ACCEPTED';
  role: IInviteTeamMemberDto['role'];
  joinedAt: string;
}

export interface IOrgTeamMembersQuery extends PagedQuery {
  organisationId: number;
  status?: IInviteTeamMemberResponseDto['invitationStatus'];
}

export interface DefaultPagination {
  totalElements: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: [
      {
        direction: string;
        nullHandling: string;
        ascending: boolean;
        property: string;
        ignoreCase: boolean;
      }
    ];
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IOrgTeamMembersListResponse extends DefaultPagination {
  content: IInviteTeamMemberResponseDto[];
}
