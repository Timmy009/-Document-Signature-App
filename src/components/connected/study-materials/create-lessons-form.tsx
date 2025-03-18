import { zodResolver } from '@hookform/resolvers/zod';
import { s3Upload } from '@/services/fileupload/hook';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { CourseSchema } from '@/zod/courses';
import { z } from 'zod';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUploadBox } from '@/components/controls/fileupload/uploadbox';
import { CircularProgressBar } from '@/components/primitives/progress/circle';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { cn, onError } from '@/lib/utils';
import { Grip, Pencil } from 'lucide-react';
import { Book04Icon, Delete02Icon, NoteIcon } from 'hugeicons-react';
import { AnimatedPresenceLayout } from '@/components/layouts/animated-presence';
import { String } from 'aws-sdk/clients/cloudsearchdomain';
import { usePersistForm } from '@/hooks/use-persist-form';
import { useParams } from 'react-router-dom';
import { MediaFileUploadBox } from '@/components/controls/fileupload/mediauploadbox';
import { Document } from '@/components/controls/document/document';
import { FileObj, PreVideo } from '@/components/controls/preimage/preimage';
import { useMutation } from '@tanstack/react-query';
import { AddStudyMaterialLessonsListApi } from '@/services/apis/study-materials';
import { toast } from 'sonner';
import { useSidebar } from '@/components/ui/sidebar';
import { CreateLessonButton } from './create-lesson-button';
import { UploadSuccessDialog } from '../upload-success-dialog';
import { StatsCard } from '@/components/primitives/study-materials/stats-card';
import { ILesson } from '@/dto/test';
import { DescriptionForm } from '@/components/controls/generic-description-form';
import { onDragStart } from '@/services/fileupload/util';

const formSchema = CourseSchema.LESSONS_FORM;

const LessonPreview = ({
  lesson,
  id,
}: {
  lesson: z.infer<typeof CourseSchema.LESSON>;
  id: String;
}) => {
  const { isMobile } = useSidebar();

  return (
    <AnimatedPresenceLayout uniqueKey={`${id}`}>
      <Card className="p-4 w-full space-y-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-warning-light rounded-md">
            <Book04Icon className="text-warning w-4 h-4" />
          </div>

          <CardTitle>{lesson?.title ? lesson.title : 'No title'}</CardTitle>
        </div>
        <div className="flex ">
          <CardDescription className="flex-1">
            {lesson?.subTitle ? lesson.subTitle : 'No lesson title description'}
          </CardDescription>
          <Button
            variant="link"
            leftIcon={<Pencil />}
            // className="color-primary"
          >
            {!isMobile ? 'Edit lesson' : null}
          </Button>
        </div>
      </Card>
    </AnimatedPresenceLayout>
  );
};

const CreateLessonsForm: React.FC = () => {
  const { study_material_id } = useParams();
  const name = `lessons_${study_material_id}`;
  const [imagePercentUpload, setImagePercentUpload] = useState(0);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [values, setValues] = useState<string[]>(() => []);
  const addStudyMaterialLessons = useMutation({
    mutationFn: AddStudyMaterialLessonsListApi,
  });
  const form = usePersistForm<z.infer<typeof formSchema>>(name, {
    defaultValues: {
      [name]: [
        {
          title: '',
          description:
            'Utilizing images that are adapted for varied screen dimensions can further boost performance. When designing UI components that integrate',
          subTitle: '',
          coverImage: null,
          content: null,
        },
      ],
    },
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const {
    control,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = form;
  const { append, fields, move, remove } = useFieldArray({
    control,
    name,
  });

  const watchFieldArray = watch(name);

  const controlledFields = fields?.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  }

  const hasInvalidFields = useMemo(() => {
    //TODO: check for all field items
    //check if any field has an empty text
    const hasemptyText = controlledFields.some(
      (field) => field?.title?.length <= 0
    );
    return hasemptyText;
  }, [controlledFields]);

  const onSubmit = useCallback(
    (publishType?: 'organisation' | 'public') => {
      const value = form.getValues();
      const lessons: ILesson[] =
        name && value && !!value?.[name]
          ? value?.[name]?.map(
              (
                lesson: {
                  coverImageFile: string | null;
                  subTitle: string;
                  description: string;
                  title: string;
                  contentFile: string | null;
                },
                index: number
              ) => ({
                coverImageFile:
                  lesson.coverImageFile ||
                  'https://images.unsplash.com/file-1635810851773-3defff69fe00image',
                subTitle: lesson.subTitle,
                description: lesson.description,
                contentFile:
                  lesson.contentFile ||
                  'https://lamport.azurewebsites.net/pubs/state-the-problem.pdf',
                title: lesson.title,
                lessonIndex: index,
              })
            )
          : [];

      if (study_material_id) {
        addStudyMaterialLessons.mutate(
          {
            lessons,
            studyMaterialId: study_material_id,
          },
          {
            onSuccess: async () => {
              // handle success
              await toast.success('lessons added successfully');
              setOpen(false);
              setSuccess(true);
            },
            onError: (err) => onError(err),
          }
        );
      }
    },
    [form, name, study_material_id, addStudyMaterialLessons]
  );

  useEffect(() => {
    // fix: fields doesn't show up on initial render
    move(0, 0);
  }, [move]);

  const handleRemove = (name: string, index: number) => {
    setValue(`${name}.${index}.content`, null);
  };

  console.log(form.getValues(), '==> form values');

  return (
    <div className="border w-full px-6 py-8 rounded-xl">
      <Form {...form}>
        <form className="space-y-5">
          <Accordion type="multiple" value={values} onValueChange={setValues}>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <Droppable droppableId="lessons" direction="vertical">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      'flex flex-col space-y-3, ',
                      snapshot.draggingFromThisWith
                        ? 'bg-purple-200 rounded-lg'
                        : ''
                    )}
                  >
                    {fields?.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <AccordionItem
                              value={field.id}
                              className={cn(
                                'pr-2',
                                snapshot.isDragging
                                  ? 'bg-slate-100 rounded-lg'
                                  : ''
                              )}
                            >
                              <AccordionTrigger
                                className="font-semibold items-start"
                                iconClassName="mt-2 ml-2"
                              >
                                <div className="flex flex-1 flex-col gap-2 justify-start items-start">
                                  <div className="flex gap-2 max-h-min items-center">
                                    <button
                                      role="button"
                                      // disabled
                                      disabled={fields.length == 1}
                                      // variant="ghost"
                                      className={cn(
                                        'px-2 py-2 border-r text-neutral-900 border-r-slate-200 cursor-grab hover:bg-slate-100  rounded-l-md transition '
                                      )}
                                      {...provided.dragHandleProps}
                                    >
                                      <Grip
                                        className="h-5 w-5"
                                        // color="text-neutral-500"
                                      />
                                    </button>
                                    Lesson {index + 1}
                                  </div>
                                  {!values.includes(field.id) && (
                                    <LessonPreview
                                      lesson={
                                        {
                                          ...watch(`${name}.${index}`),
                                          lessonIndex: index,
                                        } as ILesson
                                      }
                                      // lesson={watch(`${name}.${index}`)}
                                      id={field.id}
                                    />
                                  )}
                                </div>
                                {index !== 0 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="absolute right-[68px]"
                                  >
                                    <Delete02Icon />
                                  </Button>
                                )}
                              </AccordionTrigger>

                              <AccordionContent>
                                <Card className="flex flex-col gap-4 p-3 ">
                                  <FormField
                                    control={control}
                                    name={`${name}.${index}.title`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Lesson title</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Lesson title"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={control}
                                    name={`${name}.${index}.subTitle`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Lesson subtitle</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Math 101 Mock Exam"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <DescriptionForm<
                                    z.infer<typeof CourseSchema.LESSONS_FORM>
                                  >
                                    name={`${name}.${index}.description`}
                                    control={control}
                                    initialData={
                                      watch(`${name}.${index}`)?.description
                                    }
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`${name}.${index}.coverImage`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Cover image</FormLabel>
                                        <FormControl>
                                          <div className="flex flex-col gap-2 justify-center items-center">
                                            <FileUploadBox
                                              onDropFiles={(file) => {
                                                console.log(file, '==> file');
                                                if (file) {
                                                  field.onChange(
                                                    file?.[0].file
                                                  );
                                                }
                                              }}
                                            />

                                            {imagePercentUpload ? (
                                              <CircularProgressBar
                                                progress={imagePercentUpload}
                                              />
                                            ) : null}
                                          </div>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`${name}.${index}.content`}
                                    render={({ field }) => {
                                      const document = watch(
                                        `${name}.${index}.content`
                                      );

                                      return (
                                        <FormItem>
                                          <FormLabel>Add content</FormLabel>
                                          <FormControl>
                                            <div className="flex flex-col gap-2 justify-center items-center">
                                              <MediaFileUploadBox
                                                onDropFiles={(file) => {
                                                  console.log(file, '==> file');
                                                  if (file) {
                                                    field.onChange(file?.[0]);
                                                  }
                                                }}
                                              />
                                            </div>
                                          </FormControl>
                                          {!!document && (
                                            <div
                                              className="relative max-w-xs"
                                              key={index}
                                            >
                                              {!!document?.file &&
                                              document.file?.type?.includes(
                                                'video'
                                              ) ? (
                                                <PreVideo
                                                  document={document}
                                                  key={index}
                                                  id={index.toString()}
                                                  onCancel={() =>
                                                    handleRemove(name, index)
                                                  }
                                                  isPreUpload
                                                />
                                              ) : (
                                                <Document
                                                  document={document as FileObj}
                                                  key={index}
                                                  onCancel={() =>
                                                    handleRemove(name, index)
                                                  }
                                                  isPreUpload
                                                />
                                              )}
                                            </div>
                                          )}
                                        </FormItem>
                                      );
                                    }}
                                  />
                                </Card>
                              </AccordionContent>
                            </AccordionItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Accordion>
          <div className="flex w-full justify-end">
            <div className="flex gap-4 max-md:flex-col max-md:w-full w-1/3">
              <Button
                variant="outline"
                onClick={() =>
                  append({
                    title: '',
                    description:
                      "A detailed description of your lesson or chapter, feel free to edit this description, add links and other assets, let's teach magic cheers!",
                    subTitle: '',
                    coverImage: null,
                    content: null,
                  })
                }
                fullWidth
              >
                Add more lesson
              </Button>

              <CreateLessonButton
                open={open}
                setOpen={setOpen}
                loading={addStudyMaterialLessons.isPending}
                triggerDisabled={hasInvalidFields || !isValid || !isDirty}
                disabled={hasInvalidFields || !isValid || !isDirty}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </form>
      </Form>

      <UploadSuccessDialog open={success} setOpen={setSuccess} type="lessons">
        <div className="w-full flex items-center justify-center">
          <StatsCard
            icon={<NoteIcon className="text-[#77BAE7]" />}
            title={watch(name)?.length ? watch(name).length.toString() : '0'}
            subTitle="Lessons"
          />
        </div>
      </UploadSuccessDialog>
    </div>
  );
};

export default memo(CreateLessonsForm);
