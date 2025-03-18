import { FormHeader } from '@/components/primitives/auth/formheader';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SCHEDULE_FORM } from '@/zod/courses';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { timeData } from './constant';
import { Input } from '@/components/ui/input';
import { Banner } from '@/components/ui/banner';
import { DatePicker } from '@/components/ui/date-picker';
import { Text } from '@/components/typography/Text/text';
import { useMutation } from '@tanstack/react-query';
import { UpdateTestApi } from '@/services/apis/test';
import { useGetTestById } from '@/hooks/test';
import { toast } from 'sonner';
import { onError } from '@/lib/utils';
import { ITestDto } from '@/dto/test';

interface IScheduleForm {
  timeAllowed: number;
  startTime: Date;
  endTime: Date;
  numberOfQuestionsPerSession: string;
}

interface ITextScheduleDialogProps {
  examId: number;
  loading?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPublish: React.Dispatch<React.SetStateAction<boolean>>;
  triggerDisabled?: boolean;
}

export const TextScheduleDialog: React.FC<ITextScheduleDialogProps> = ({
  loading,
  triggerDisabled,
  open,
  setOpen,
  setOpenPublish,
  examId,
}) => {
  const { test } = useGetTestById({ examId });

  const form = useForm<IScheduleForm>({
    defaultValues: {
      timeAllowed: test ? test?.timeAllowed : 0,
      startTime: test?.startTime ? new Date(test.startTime) : new Date(),
      endTime: test?.endTime ? new Date(test.endTime) : new Date(),
      numberOfQuestionsPerSession: test
        ? test?.numberOfQuestionsPerSession?.toString()
        : '0',
    },
    resolver: zodResolver(SCHEDULE_FORM),
  });

  const formWatch = form.watch();

  const { isValid, isDirty } = form.formState;

  const updateTest = useMutation({ mutationFn: UpdateTestApi });

  const onExamScheduleSubmit = async (values: IScheduleForm) => {
    const errors = !form.formState.isValid;

    if (errors) {
      toast.error('Invalid data, please try again', {});
    }

    if (test) {
      const exam: Omit<ITestDto, 'id'> = {
        courseId: test.course.id!,
        name: test.examTitle,
        imageUrl: test.imageUrl,
        instructions: test.instructions || 'No instructions',
        objective: test.objective,
        ...values,
        startTime: values.startTime.toISOString(),
        endTime: values.endTime.toISOString(),
        numberOfQuestionsPerSession: Number(values.numberOfQuestionsPerSession),
      };

      await updateTest.mutate(
        {
          examId,
          exam,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setOpenPublish(true);
          },
          onError: (err) => onError(err, 'Error updating test'),
        }
      );
    }

    return '';
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={triggerDisabled} asChild className="w-full">
        <Button disabled={triggerDisabled}>Proceed</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="schedule-form"
        // className="group:justify-center text-center"
      >
        <DialogHeader className="justify-center">
          <DialogTitle>
            <FormHeader
              heading="Set a time"
              desc="Set milestones, stay on track, and achieve success with confidence."
            />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="timeAllowed"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Pick a time</FormLabel>
                    <FormControl>
                      <Combobox
                        {...field}
                        data={timeData.map(({ label, value }) => ({
                          value: value.toString(),
                          label,
                        }))}
                        value={formWatch.timeAllowed?.toString()}
                        name="time"
                        onChange={(value) => {
                          form.setValue('timeAllowed', Number(value));
                        }}
                        width="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        selected={field.value}
                        onSelect={field.onChange}
                        placeholder="Select a start date"
                        disabled={(date) => date < new Date('1900-01-01')}
                      />
                    </FormControl>
                    <FormDescription>Your exam start date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date('1900-01-01')}
                        placeholder="Select an end date"
                      />
                    </FormControl>
                    <FormDescription>Your exam end date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Text fontSize="text-sm" fontWeight="font-semibold">
                  Question selection
                </Text>

                <Banner
                  label="Note"
                  description="Select number of questions attempt for the question bank"
                  className="max-w-sm"
                />
              </div>

              <FormField
                control={form.control}
                name="numberOfQuestionsPerSession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select numbers of questions per section{' '}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting || loading}
                        placeholder="50"
                        {...field}
                        type="number"
                        error={
                          !!form.formState.errors.numberOfQuestionsPerSession
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogDescription>
        <DialogFooter className="pt-3 gap-4">
          <Button
            fullWidth
            variant="outline_base"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            disabled={!isValid || !isDirty}
            loading={updateTest.isPending}
            fullWidth
            onClick={form.handleSubmit(onExamScheduleSubmit)}
            type="submit"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
