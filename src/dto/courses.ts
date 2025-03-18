export interface CourseDto {
  id: number;
  imageUrl: string;
  courseTitle: string;
  description: string;
  courseCode: string;
  icon: string;
  unit: number;
}

export type CourseListResponseDto = CourseDto[];

export interface PagedQuery {
  page?: number;
  size?: number;
}
export interface GetPagedCoursesQuery extends PagedQuery {
  searchterm?: string;
}

export interface GetPagedCoursesByInstitutionIdQuery extends PagedQuery {
  institutionId: string;
  searchQuery?: string;
}
export interface GetPagedFacultiesByInstitutionIdQuery
  extends GetPagedCoursesQuery {
  institutionId: string;
}
export interface GetPagedDepartmentsByFacultyIdQuery extends PagedQuery {
  facultyId: string;
}

export interface StudyMaterialDto {
  bookmarkCount: number;
  courseTitle: string;
  coverImageUrl: string;
  description: string;
  fileUrl: string;
  id: number;
  title: string;
}
export interface CreateStudyMaterialDto {
  courseTitle: string;
  coverImageUrl: string;
  description: string;
  id: number;
  courseId: number;
  lessonsRequest?: {
    mediaFile: string;
    title: string;
  }[];
}

export type StudyMaterialListDto = StudyMaterialDto[];

export interface IFaculty {
  institutionId: number;
  facultyId: number;
  name: string;
  icon: string;
}

export type FacultyListDto = IFaculty[];

export interface IInstitution {
  id: number;
  name: string;
  country: string;
  state: string;
  city: string;
}

export type InstitutionListDto = IInstitution[];
export interface IDepartment {
  departmentId: number;
  name: string;
}

export type IDepartmentsDto = IDepartment[];

export enum ContributionsEnum {
  STUDYMATERIALCOUNT = 'studyMaterialCount',
  EXAMCOUNT = 'examCount',
  TOTALUNIQUECOURSES = 'totalUniqueCourses',
}
