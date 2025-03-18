export const defaultFormValue = {
  institutions: {
    searchterm: '',
    page: 1,
    size: 10,
  },
  departments_by_facultyId: {
    searchterm: '',
    page: 1,
    size: 10,
  },
  faculties: {
    searchterm: '',
    page: 1,
    size: 10,
  },
  courses_by_institutionId: {
    page: 1,
    size: 10,
    searchterm: '',
  },
};

export const createOption = () => ({
  optionText: '',
  imageFiles: null,
  images: null,
  correctOption: false,
});

export const defaultQuestionValue = {
  questionText: '',
  images: null,
  imageFiles: null,
  explanation: '',
  instructions: '',
  questionType: 'MULTIPLE_CHOICE',
  selections: [createOption(), createOption()],
};

export const timeData = [
  { label: '15 Minutes', value: 15 },
  { label: '30 Minutes', value: 30 },
  { label: '45 Minutes', value: 45 },
  { label: '1 Hour', value: 60 },
  { label: '1 Hour 15 minutes', value: 75 },
  { label: '1 Hour 30 Minutes', value: 90 },
];
