import { CourseDto, PagedQuery, StudyMaterialDto } from './courses';
import { DefaultPagination } from './org';
import { IUser } from './user';

export interface ILesson {
  title: string;
  subTitle: string;
  description: string;
  contentFile: string;
  lessonIndex: number;
  coverImageFile: string;
}

export interface ITestDto {
  id: number;
  name: string;
  courseId: number;
  objective: string;
  imageUrl: string;
  instructions: string;
  timeAllowed?: number;
  numberOfQuestionsPerSession?: number;
  startTime?: Date | string;
  endTime?: Date | string;
}
export interface ITestResponseDto {
  id: number;
  examTitle: string;
  form: null;
  course: CourseDto;
  objective: string;
  imageUrl: string;
  instructions: string;
  timeAllowed?: number;
  createQuestion?: Array<object>;
  numberOfQuestionsPerSession?: number;
  score: number | null;
  createdAt: string;
  startTime: null | Date | string;
  endTime: null | Date | string;
}

export interface IMyUpload {
  id: number;
  type: 'Exam' | 'StudyMaterial';
  createdAt: string | null;
  data: ITestDto | StudyMaterialDto;
}

export interface IContent {
  id: string;
  text: string;
  imageUrl: string | null;
}

type Images = Array<{ imageUrl: string }>;

type ImagesResponse = Array<{ imageUrl: string; id: number }>;

export interface IOption {
  optionText: string;
  correctOption: boolean;
  images: Images | null;
}

export interface IOptionResponse extends Omit<IOption, 'correctOption'> {
  correct: boolean;
}

export interface IQuestionDto {
  questionText: string;
  instructions: string;
  explanation: string;
  selections: IOption[] | null;
  images: Images | null;
  questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
}

export interface IQuestionResponseDto {
  id: number;
  questionText: string;
  instructions: string;
  explanation: string;
  selections: IOptionResponse[] | null;
  images: ImagesResponse | null;
  questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
}

export interface IAddQuestionParam {
  examId: string;
  questions: IQuestionDto[];
}

export interface ITestPerformanceAnalysisDto {
  examId: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalParticipants: number;
}

export interface ITestAnalysisDto {
  totalResponses: number;
  percentAbove50: number;
  percentBelow50: number;
  averageScore: number;
}

export interface ISubmissionTestAnalysis {
  totalSubmissions: number;
  completedPercentage: number;
  accuracyPercentage: number;
  averageCompletionTime: number;
}

export interface ITestAnalysisQuery extends PagedQuery {
  seachQuery?: string;
  examId: number;
}
export interface ITestQuery extends PagedQuery {
  examId: number;
}

export interface ITestQuestion {
  questionResponseDTO: {
    questionText: string;
    images: string[];
  };
  userSelection: {
    id: number;
    optionText: string;
    images: string[] | null;
    correct: boolean;
  }[];
}

export interface ITestSummaryDto {
  user: IUser;
  score: number;
  question: ITestQuestion[];
}

export interface ITestSummaryResponseDto extends DefaultPagination {
  content: Array<ITestSummaryDto>;
}
export interface IIQuestionListResponseDto extends DefaultPagination {
  content: Array<IQuestionResponseDto>;
}
