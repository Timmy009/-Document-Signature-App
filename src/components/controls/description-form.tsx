import * as z from 'zod';
import { Control } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Preview } from '../ui/preview';
import { CourseSchema } from '@/zod/courses';
import { Editor } from '../ui/editor';

interface LessonDescriptionFormProps {
  // initialData: z.infer<typeof CourseSchema.LESSON>;
  initialData: z.infer<typeof CourseSchema.LESSON>;
  control: Control<z.infer<typeof CourseSchema.LESSONS_FORM>>;
  index: number;
  name: string;
}

export const DescriptionForm = ({
  initialData,
  control,
  index,
  name,
}: LessonDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  console.log(initialData, '==> initialData');

  return (
    <div className="border space-y-1 bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lesson description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            'text-sm mt-2',
            !initialData.description && 'text-slate-500 italic'
          )}
        >
          {!initialData.description && 'No description'}
          {initialData.description && (
            <Preview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <FormField
          control={control}
          // name="description"
          name={`${name}.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
