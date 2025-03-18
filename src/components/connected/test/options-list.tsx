import { Button } from '@/components/ui/button';
import { CourseSchema } from '@/zod/courses';
import {
  Control,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { z } from 'zod';
import { createOption } from './constant';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Cancel01Icon } from 'hugeicons-react';
import { Grip, PlusIcon } from 'lucide-react';
import { ButtonUploadBox } from '@/components/controls/fileupload/uploadbox';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { onDragStart } from '@/services/fileupload/util';
import { FileObj, PreImage } from '@/components/controls/preimage/preimage';

interface IOptionsListProps {
  // options: IContent[];
  control: Control<z.infer<typeof CourseSchema.QUESTION_FORM>>;

  formName: string;
  nestedIndex: number;
  setValue: UseFormSetValue<
    | {
        [x: string]: unknown;
      }
    | Record<string, unknown>
  >;
}

export const OptionsList: React.FC<IOptionsListProps> = ({
  // options,
  control,
  formName,
  nestedIndex,
  setValue,
}) => {
  // if (!options || !options.length) return null;
  const name = `${formName}.${nestedIndex}.selections`;

  const { append, fields, move, remove } = useFieldArray({
    control,
    name,
  });

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  }

  const value = useWatch({
    name,
    control,
  });

  const handleRemove = (name: string, index: number, imageIndex: number) => {
    const curentImages = value[index]?.images;
    const filteredImages = curentImages.filter(
      (_: FileObj, idx: number) => imageIndex !== idx
    );

    setValue(name, filteredImages);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="questions" direction="vertical">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex flex-col space-y-3',
              snapshot.draggingFromThisWith ? 'bg-purple-100 rounded-lg' : ''
            )}
          >
            {fields.map((df, index) => {
              return (
                <Draggable key={df.id} draggableId={df.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        'relative',
                        snapshot.isDragging ? 'bg-slate-100 rounded-lg' : ''
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex gap-2 max-w-screen-lg ">
                          <div
                            role="button"
                            className="p-2 hover:bg-slate-100 text-neutral-900 rounded-md"
                            {...provided.dragHandleProps}
                          >
                            <Grip className="h-5 w-5" />{' '}
                          </div>

                          <FormField
                            control={control}
                            name={`${name}.${index}.optionText`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <FormInput
                                    placeholder={`Answer ${index + 1}`}
                                    {...field}
                                    rightIcon={
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <FormField
                                            control={control}
                                            name={`${name}.${index}.correctOption`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                      field.onChange
                                                    }
                                                    className="rounded-full"
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Mark answer as correct
                                        </TooltipContent>
                                      </Tooltip>
                                    }
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
                                  <ButtonUploadBox
                                    className="px-2 border-none"
                                    onDropFiles={(file) => {
                                      console.log(file, '==> file');
                                      if (file) {
                                        field.onChange(file);
                                      }
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <Button
                            variant="ghost"
                            onClick={() => remove(index)}
                            size="icon"
                          >
                            <Cancel01Icon />
                          </Button>
                        </div>
                        {Array.isArray(value[index]?.images) &&
                        value[index]?.images.length > 0 ? (
                          <div className="flex gap-2 flex-wrap">
                            {value?.[index]?.images.map(
                              (document: FileObj, idx: number) => {
                                return (
                                  <PreImage
                                    key={document.url}
                                    document={document}
                                    id={document.url}
                                    onCancel={() =>
                                      handleRemove(
                                        `${name}.${index}.images`,
                                        index,
                                        idx
                                      )
                                    }
                                  />
                                );
                              }
                            )}
                          </div>
                        ) : null}{' '}
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div>
        <Button
          variant="link"
          onClick={() => {
            const optionDefault = createOption();
            append(optionDefault);
          }}
          leftIcon={<PlusIcon />}
        >
          Add answer
        </Button>
      </div>
    </DragDropContext>
  );
};
