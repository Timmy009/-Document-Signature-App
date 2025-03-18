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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { CourseSchema } from '@/zod/courses';
import { z } from 'zod';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ButtonUploadBox } from '@/components/controls/fileupload/uploadbox';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { cn, onError } from '@/lib/utils';
import { Grip } from 'lucide-react';
import { Delete02Icon, NoteIcon, Time02Icon } from 'hugeicons-react';
import { usePersistForm } from '@/hooks/use-persist-form';
import { useParams } from 'react-router-dom';
import { FileObj, PreImage } from '@/components/controls/preimage/preimage';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UploadSuccessDialog } from '../upload-success-dialog';
import { StatsCard } from '@/components/primitives/study-materials/stats-card';
import { IQuestionDto } from '@/dto/test';
import { AddQuestionsListApi } from '@/services/apis/test';
import { QuestionPreview } from './question-preview';
import { defaultQuestionValue } from './constant';
import { DescriptionForm } from '@/components/controls/generic-description-form';
import { OptionsList } from './options-list';
import { onDragStart } from '@/services/fileupload/util';
import { RadioGroup } from '@/components/ui/radio-group';
import { ButtonRadioItem } from '@/components/ui/form-radio-item';
import { Banner } from '@/components/ui/banner';
import { TextScheduleDialog } from './text-schedule-dialog';
import { CreateQuestionsButton } from './create-questions-button';
import { useGetTestById } from '@/hooks/test';

const formSchema = CourseSchema.QUESTION_FORM;

export const CreateQuestionsForm: React.FC = () => {
  const { examId } = useParams();
  const name = `questions_${examId}`;
  const [imagePercentUpload, setImagePercentUpload] = useState(0);
  const [open, setOpen] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);

  const [success, setSuccess] = useState(false);
  const { test } = useGetTestById({ examId: Number(examId) });

  const [values, setValues] = useState<string[]>(() => []);
  const addQuestions = useMutation({
    mutationFn: AddQuestionsListApi,
  });
  const form = usePersistForm<z.infer<typeof formSchema>>(name, {
    defaultValues: {
      [name]: [defaultQuestionValue],
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
      (field) => field?.questionText?.length <= 0
    );
    return hasemptyText;
  }, [controlledFields]);

  const onSubmit = useCallback(
    (publishType?: 'organisation' | 'public') => {
      const value = form.getValues();
      const questions: IQuestionDto[] =
        name && value && !!value?.[name]
          ? (value?.[name]?.map(
              ({
                questionText,
                explanation,
                images,
                instructions,
                questionType,
                selections,
              }: IQuestionDto) => {
                const newSelections =
                  Array.isArray(selections) && selections.length > 0
                    ? selections.map(
                        ({ optionText, images, correctOption }) => ({
                          optionText,
                          images,
                          correctOption,
                        })
                      )
                    : selections;

                return {
                  questionText,
                  explanation,
                  images,
                  instructions,
                  questionType,
                  selections: newSelections,
                };
              }
            ) as IQuestionDto[])
          : [];

      if (examId) {
        addQuestions.mutate(
          {
            questions,
            examId: examId,
          },
          {
            onSuccess: async () => {
              // handle success
              await toast.success('questions added successfully');
              setOpen(false);
              setSuccess(true);
            },
            onError: (err) => onError(err),
          }
        );
      }
    },
    [form, name, examId, addQuestions]
  );

  useEffect(() => {
    // fix: fields doesn't show up on initial render
    move(0, 0);
  }, [move]);

  const handleRemove = (name: string, index: number) => {
    const curentImages = watch(name);
    const filteredImages = curentImages.filter(
      (_: FileObj, idx: number) => index !== idx
    );
    setValue(name, filteredImages);
  };

  return (
    <div className="border w-full px-6 py-8 rounded-xl">
      <Form {...form}>
        <form className="space-y-5">
          <Accordion type="multiple" value={values} onValueChange={setValues}>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <Droppable droppableId="questions" direction="vertical">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col space-y-3"
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
                                      type="button"
                                    >
                                      <Grip
                                        className="h-5 w-5"
                                        // color="text-neutral-500"
                                      />
                                    </button>
                                    Question {index + 1}
                                  </div>
                                  {!values.includes(field.id) && (
                                    <QuestionPreview
                                      question={
                                        {
                                          ...watch(`${name}.${index}`),
                                          questionIndex: index,
                                        } as IQuestionDto
                                      }
                                      // question={watch(`${name}.${index}`)}
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
                                    type="button"
                                  >
                                    <Delete02Icon />
                                  </Button>
                                )}
                              </AccordionTrigger>
                              <AccordionContent>
                                <Card className="flex flex-col gap-4 p-3 ">
                                  <FormField
                                    name={`${name}.${index}.questionType`}
                                    control={form.control}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex  items-center max-md:space-x-0 space-x-3"
                                          >
                                            <FormItem>
                                              <FormControl>
                                                <ButtonRadioItem
                                                  value="MULTIPLE_CHOICE"
                                                  label="Multiple-choice"
                                                  checked={
                                                    field.value ==
                                                    'MULTIPLE_CHOICE'
                                                  }
                                                />
                                              </FormControl>
                                            </FormItem>
                                            <FormItem>
                                              <FormControl>
                                                <ButtonRadioItem
                                                  value="SHORT_ANSWER"
                                                  label="Short answer"
                                                  checked={
                                                    field.value ==
                                                    'SHORT_ANSWER'
                                                  }
                                                />
                                              </FormControl>
                                            </FormItem>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <div className="space-y-2">
                                    <FormLabel>Question {index + 1}</FormLabel>

                                    <div className="flex gap-2">
                                      <FormField
                                        control={control}
                                        name={`${name}.${index}.questionText`}
                                        render={({ field }) => (
                                          <FormItem className="w-full">
                                            <FormControl>
                                              <Input
                                                placeholder="Question"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={control}
                                        name={`${name}.${index}.images`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <div className="flex gap-2">
                                                <ButtonUploadBox
                                                  onDropFiles={(file) => {
                                                    if (file) {
                                                      field.onChange(file);
                                                    }
                                                  }}
                                                />
                                              </div>
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    {Array.isArray(
                                      watch(`${name}.${index}.images`)
                                    ) &&
                                    watch(`${name}.${index}.images`).length > 0
                                      ? watch(`${name}.${index}.images`).map(
                                          (document: FileObj, idx: number) => (
                                            <PreImage
                                              document={document}
                                              id={document.url}
                                              onCancel={() =>
                                                handleRemove(
                                                  `${name}.${index}.images`,
                                                  idx
                                                )
                                              }
                                              className="w- h-full"
                                            />
                                          )
                                        )
                                      : null}
                                  </div>

                                  <OptionsList
                                    control={control}
                                    formName={name}
                                    nestedIndex={index}
                                    setValue={setValue}
                                  />

                                  <div className="flex flex-col gap-3 max-md:flex-col-reverse">
                                    <Banner
                                      label="Note"
                                      description="Check the correct answer"
                                      className="max-w-sm"
                                    />
                                    <>
                                      <DescriptionForm<
                                        z.infer<
                                          typeof CourseSchema.QUESTION_FORM
                                        >
                                      >
                                        name={`${name}.${index}.instructions`}
                                        control={control}
                                        initialData={
                                          watch(`${name}.${index}`)
                                            ?.instructions
                                        }
                                        label="Instructions"
                                        placeholder="No Instructions Yet"
                                      />

                                      <DescriptionForm<
                                        z.infer<
                                          typeof CourseSchema.QUESTION_FORM
                                        >
                                      >
                                        name={`${name}.${index}.explanation`}
                                        control={control}
                                        initialData={
                                          watch(`${name}.${index}`)?.explanation
                                        }
                                        label="Explanation"
                                        placeholder="No Explanation Yet"
                                      />
                                    </>
                                  </div>
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
                onClick={() => append(defaultQuestionValue)}
                type="button"
                fullWidth
              >
                Add more question
              </Button>

              <TextScheduleDialog
                open={open}
                setOpen={setOpen}
                setOpenPublish={setOpenPublish}
                loading={addQuestions.isPending}
                triggerDisabled={
                  hasInvalidFields || !isValid || !isDirty || !examId
                }
                examId={Number(examId)}
              />
            </div>
          </div>
        </form>
      </Form>

      <UploadSuccessDialog open={success} setOpen={setSuccess} type="question">
        <div className="w-full flex gap-3 items-center justify-center">
          <StatsCard
            icon={<NoteIcon className="text-[#77BAE7]" />}
            title={watch(name)?.length ? watch(name).length.toString() : '0'}
            subTitle="Questions"
          />
          <StatsCard
            icon={<Time02Icon className="text-[#2ECC71]" />}
            title={
              test?.timeAllowed ? test?.timeAllowed.toString() ?? '0' : '0'
            }
            subTitle="Time"
          />
        </div>
      </UploadSuccessDialog>
      <CreateQuestionsButton
        open={openPublish}
        setOpen={setOpenPublish}
        loading={addQuestions.isPending}
        // triggerDisabled={!isValid || !isDirty}
        disabled={hasInvalidFields || !isValid || !isDirty || !examId}
        onSubmit={onSubmit}
      />
    </div>
  );
};
