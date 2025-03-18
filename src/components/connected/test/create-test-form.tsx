import { Combobox } from '@/components/ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GetPagedCoursesQuery } from '@/dto/courses';
import { useCoursesByInstitutionId, useInstitutions } from '@/hooks/courses';
import { QUERY_KEY } from '@/lib/queryKeys';
import { CourseSchema } from '@/zod/courses';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDebounce } from '@/hooks/use-debounce';
import { Textarea } from '@/components/ui/textarea';
import { FileUploadBox } from '@/components/controls/fileupload/uploadbox';
import { Button } from '@/components/ui/button';
import { s3Upload } from '@/services/fileupload/hook';
import { CircularProgressBar } from '@/components/primitives/progress/circle';
import { defaultFormValue } from './constant';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { onError } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { CreateTestApi } from '@/services/apis/test';
import { ITestDto } from '@/dto/test';

const DEFAULT_TIME = 800;
const DEFAULT_SIZE = 40;

const formSchema = CourseSchema.TEST_FORM;

export const CreateTestForm: React.FC = () => {
  const [imagePercentUpload, setImagePercentUpload] = useState(0);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      course: {},
      institution: {},
    },
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { isSubmitting, isValid } = form.formState;

  const { watch, setValue, register, getValues } = useForm<
    Record<keyof typeof QUERY_KEY, GetPagedCoursesQuery>
  >({
    defaultValues: defaultFormValue,
  });

  const createTest = useMutation({
    mutationFn: CreateTestApi,
    mutationKey: [QUERY_KEY.create_test],
  });
  const formWatch = form.watch();

  const institutionField = watch();

  const debouncedInstitutionQuery = useDebounce(
    institutionField.institutions.searchterm,
    DEFAULT_TIME
  );

  const debouncedCourseQuery = useDebounce(
    institutionField.courses_by_institutionId.searchterm,
    DEFAULT_TIME
  );

  // const debounceInstitutionId = useDebounce(
  //   form.getValues()?.institution?.id?.toString(),
  //   DEFAULT_TIME
  // );

  const { institutions, isLoading } = useInstitutions({
    searchterm: debouncedInstitutionQuery,
  });

  const { courses_by_institutionId, isLoading: isLoadingCourses } =
    useCoursesByInstitutionId({
      institutionId: formWatch?.institution?.id?.toString(),
      size: DEFAULT_SIZE,
      searchQuery: debouncedCourseQuery,
    });

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      const fileUrl = null;

      //check that user's ID was uploaded
      // if (data.image) {
      //   //upload ID to s3 bucket and retrieve URL
      //   await s3Upload({
      //     file: data.image,
      //     onError: (error) => console.log('Error === ', error),
      //     onPercent: (imagePercentUpload) =>
      //       setImagePercentUpload(imagePercentUpload),
      //     onSuccess: (result) => {
      //       fileUrl = result.locationUrl;
      //     },
      //   });
      // }

      const defaultPayload: Omit<ITestDto, 'id'> = {
        examTitle: data.name,
        courseId: data.course.id,
        imageUrl:
          'https://images.pexels.com/photos/30353894/pexels-photo-30353894/free-photo-of-aerial-view-of-urban-residential-complex.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        instructions: data.instructions,
        objective: data.objective,
      };

      await createTest.mutate(defaultPayload, {
        onSuccess: (res) => {
          toast.success(res.message ?? 'test created successfully');
          navigate(`/upload/create-questions/${res.examId}`);
        },
        onError: (err) => onError(err, 'Error occurred please try again'),
      });
    },
    [createTest, navigate]
  );

  return (
    <div className="border w-full px-6 py-8 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex w-full gap-4 max-md:flex-wrap">
            <div className="w-full">
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Combobox
                        {...field}
                        data={[
                          ...new Set(
                            institutions?.map((institution) => ({
                              // value: institution.id.toString(),
                              value: institution.name,
                              label: institution.name,
                            }))
                          ).values(),
                        ]}
                        value={formWatch.institution.courseTitle}
                        name="institutions"
                        onChange={(value) => {
                          const item = institutions.find(
                            (item) => item.name === value
                          );
                          if (item) {
                            form.setValue('institution', {
                              courseTitle: item?.name,
                              id: item.id,
                            });
                          }
                        }}
                        loading={isLoading}
                        width="w-full"
                        resetSearch={() => {
                          if (institutions.length <= 0) {
                            setValue(`institutions.searchterm`, '');
                          }
                        }}
                        searchProps={{
                          ...register('institutions.searchterm'),
                          value: getValues().institutions.searchterm,
                          onValueChange(search) {
                            setValue(`institutions.searchterm`, search);
                          },
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select Course</FormLabel>
                    <FormControl>
                      <Combobox
                        {...field}
                        data={courses_by_institutionId?.map((course) => ({
                          value: course.courseTitle,
                          label: course.courseTitle,
                        }))}
                        name="courses"
                        value={formWatch.course.courseTitle}
                        onChange={(value) => {
                          const item = courses_by_institutionId.find(
                            (item) => item.courseTitle === value
                          );
                          if (item) {
                            form.setValue('course', {
                              courseTitle: item.courseTitle,
                              id: item.id,
                            });
                          }
                        }}
                        width="w-full"
                        loading={isLoadingCourses}
                        disabled={Boolean(!formWatch?.institution?.id)}
                        resetSearch={() => {
                          if (courses_by_institutionId.length <= 0) {
                            setValue(`courses_by_institutionId.searchterm`, '');
                          }
                        }}
                        searchProps={{
                          ...register('courses_by_institutionId.searchterm'),
                          value:
                            getValues().courses_by_institutionId.searchterm,
                          onValueChange(search) {
                            setValue(
                              `courses_by_institutionId.searchterm`,
                              search
                            );
                          },
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="examTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Title</FormLabel>
                <FormControl>
                  <Input
                    // disabled={isSubmitting}
                    placeholder="Math 101 Mock Exam"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormItem>Cover image</FormItem>
                <FormControl>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <FileUploadBox
                      onDropFiles={(file) => {
                        console.log(file, '==> file');

                        field.onChange(file[0].file);
                      }}
                    />
                    {imagePercentUpload ? (
                      <CircularProgressBar progress={imagePercentUpload} />
                    ) : null}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Outline you exam instructions to give more context............"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objective</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Outline you exam objective to give more context............"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || createTest.isPending}
              loading={createTest.isPending || isSubmitting}
            >
              Proceed
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
