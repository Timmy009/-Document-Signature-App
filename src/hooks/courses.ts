import { GetPagedCoursesByInstitutionIdQuery, GetPagedCoursesQuery, GetPagedDepartmentsByFacultyIdQuery, GetPagedFacultiesByInstitutionIdQuery } from "@/dto/courses";
import { QUERY_KEY } from "@/lib/queryKeys";
import { GetContributionsApi, GetCoursesByInstitutionIdApi, GetDepartmentsByFacultyIdApi, GetFacultiesApi, GetFacultiesByInstitutionIdApi, GetInstitutionsApi, GetMyUploadsdApi, GetPopularCoursesApi, GetPopularStudyMaterialsApi } from "@/services/apis/courses";
import { useQuery } from "@tanstack/react-query";

export const useMyUploads = (params: GetPagedCoursesQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.my_uploads, params],
    queryFn: () => GetMyUploadsdApi(params),
  });

  // Mock files with realistic document names and details
  const mockFiles = [
    {
      id: 1,
      fileName: "Project Proposal.pdf",
      fileUrl: "/CIS for Private Car Package Policy.pdf",
      uploadDate: "2024-02-10",
      status: "Pending Processing",
      summary: "A proposal document outlining project scope and objectives.",
      qa: [
        { question: "What is the project goal?", answer: "To develop a web-based solution." },
        { question: "Who is the target audience?", answer: "Small businesses and startups." },
      ],
      audioUrl: "/audio/project_proposal.mp3",
    },
    {
      id: 2,
      fileName: "Financial Report 2023.docx",
      fileUrl:"/CIS for Two Wheeler Package Policy.pdf",
      uploadDate: "2024-01-15",
      status: "Processed",
      summary: "A detailed financial summary for the fiscal year 2023.",
      qa: [
        { question: "What is the total revenue?", answer: "$5,000,000" },
        { question: "What are the major expenses?", answer: "Salaries, marketing, and R&D." },
      ],
      audioUrl: "/audio/financial_report.mp3",
    },
    {
      id: 3,
      fileName: "Contract Agreement.pdf",
      fileUrl:"/CIS_Money Insurance Policy.pdf",
      uploadDate: "2024-03-01",
      status: "Completed",
      summary: "A legally binding contract between two parties.",
      qa: [
        { question: "Who are the involved parties?", answer: "Company A and Vendor B." },
        { question: "What is the contract duration?", answer: "12 months." },
      ],
      audioUrl: "/audio/contract_agreement.mp3",
    },
    {
      id: 4,
      fileName: "Marketing Strategy.docx",
      uploadDate: "2024-02-22",
      fileUrl:"/Loss of License Policy(Individual and Group).pdf",
      status: "Pending Processing",
      summary: "A marketing plan for product launch in Q2 2024.",
      qa: [
        { question: "What is the target market?", answer: "Tech enthusiasts and professionals." },
        { question: "What platforms will be used?", answer: "Social media, PPC ads, and SEO." },
      ],
      audioUrl: "/audio/marketing_strategy.mp3",
    },
    {
      id: 5,
      fileName: "Employee Handbook.pdf",
      uploadDate: "2024-01-30",
      status: "Processed",
      fileUrl:'/m3-f2.pdf',
      summary: "A guide covering company policies and workplace expectations.",
      qa: [
        { question: "What is the dress code?", answer: "Business casual." },
        { question: "How are performance reviews conducted?", answer: "Quarterly evaluations." },
      ],
      audioUrl: "/audio/employee_handbook.mp3",
    },
    {
      id: 6,
      fileName: "Research Paper on AI.pdf",
      uploadDate: "2024-02-18",
      status: "Completed",
      fileUrl:"/Overseas Mediclaim Policy be1.pdf",
      summary: "An academic paper exploring AI trends and advancements.",
      qa: [
        { question: "What is the focus of the research?", answer: "Machine learning in healthcare." },
        { question: "What are the key findings?", answer: "AI can improve diagnostic accuracy." },
      ],
      audioUrl: "/audio/research_paper.mp3",
    },
    {
      id: 7,
      fileName: "Business Plan 2024.docx",
      uploadDate: "2024-01-10",
      status: "Pending Processing",
      fileUrl:'/Overseas Mediclaim Policy le2.pdf',
      summary: "A roadmap for business growth and expansion in 2024.",
      qa: [
        { question: "What are the revenue projections?", answer: "$10 million by Q4." },
        { question: "Who are the main competitors?", answer: "Company X and Y." },
      ],
      audioUrl: "/audio/business_plan.mp3",
    },
    {
      id: 8,
      fileName: "Annual Report.pdf",
      uploadDate: "2024-02-05",
      fileUrl:"/Overseas Mediclaim Policy le2.pdf",
      status: "Processed",
      summary: "A comprehensive report on company performance and growth.",
      qa: [
        { question: "What was the customer growth rate?", answer: "15% year-over-year." },
        { question: "What were the biggest challenges?", answer: "Supply chain disruptions." },
      ],
      audioUrl: "/audio/annual_report.mp3",
    },
    {
      id: 9,
      fileName: "Legal Compliance Guide.docx",
      uploadDate: "2024-03-05",
      fileUrl:"/Personal Accident Policy(Individual and Group).pdf",
      status: "Completed",
      summary: "A guide outlining industry regulations and compliance standards.",
      qa: [
        { question: "What are the key compliance areas?", answer: "Data privacy and security." },
        { question: "What laws are covered?", answer: "GDPR, CCPA, and HIPAA." },
      ],
      audioUrl: "/audio/legal_compliance.mp3",
    },
    {
      id: 10,
      fileName: "Technical Specification.pdf",
       fileUrl:'/m3-f2.pdf',
      uploadDate: "2024-02-28",
      status: "Pending Processing",
      summary: "A document detailing software architecture and features.",
      qa: [
        { question: "What programming languages are used?", answer: "React, Node.js, and PostgreSQL." },
        { question: "What security measures are implemented?", answer: "OAuth, JWT, and encryption." },
      ],
      audioUrl: "/audio/technical_specification.mp3",
    },
  ];

  return {
    uploads: data?.myUploads?.length ? data.myUploads : mockFiles, // Use mock data if API returns empty
    isError,
    isLoading,
    isFetching,
    error,
    hasNext: data?.hasNext ?? false,
  };
};


export const usePopularCourses = (params: GetPagedCoursesQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.popular_courses],
    queryFn: () => GetPopularCoursesApi(params),
  });

  return {
    popular_courses: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const usePopularStudyMaterials = (params: GetPagedCoursesQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.popular_study_materials],
    queryFn: () => GetPopularStudyMaterialsApi(params),
  });

  return {
    popular_study_materials: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useCoursesByInstitutionId = (
  params: GetPagedCoursesByInstitutionIdQuery
) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.courses_by_institutionId, params],
    queryFn: () => GetCoursesByInstitutionIdApi(params),
  });

  return {
    courses_by_institutionId: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useDepartmentsByFacultyId = (
  params: GetPagedDepartmentsByFacultyIdQuery
) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.departments_by_facultyId],
    queryFn: () => GetDepartmentsByFacultyIdApi(params),
  });

  return {
    departments_by_facultyId: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useInstitutions = (params: GetPagedCoursesQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.institutions, params.searchterm],
    queryFn: () => GetInstitutionsApi(params),
  });

  return {
    institutions: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useFaculties = (params: GetPagedCoursesQuery) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.faculties],
    queryFn: () => GetFacultiesApi(params),
  });

  return {
    faculties: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

export const useFacultiesByInstitutionId = (
  params: GetPagedFacultiesByInstitutionIdQuery
) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.faculties_by_institution_id, params],
    queryFn: () => GetFacultiesByInstitutionIdApi(params),
  });

  return {
    faculties: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
  };
};



export const useContributions = () => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.contributions],
    queryFn: GetContributionsApi,
  });

  return {
    contributions: data ?? {},
    isError,
    isLoading,
    isFetching,
    error,
  };
};
