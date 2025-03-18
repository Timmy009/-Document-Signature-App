import { Control, FieldValues, Path } from 'react-hook-form';
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
import { Editor } from '../ui/editor';

interface DescriptionFormProps<T extends FieldValues> {
  /**
   * Initial data for the description field.
   */
  initialData: string;
  /**
   * React Hook Form control object.
   */
  control: Control<T>;
  /**
   * The name of the field in the form (e.g., `description` or `lessons.0.description`).
   */
  name: string;
  /**
   * Label to display above the form field.
   * @default "Description"
   */
  label?: string;
  /**
   * Placeholder text to show when no description is provided.
   * @default "No description"
   */
  placeholder?: string;
}

export const DescriptionForm = <T extends FieldValues>({
  initialData,
  control,
  name,
  label = 'Description',
  placeholder = 'No description',
}: DescriptionFormProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className=" space-y-1">
      <div className="font-medium flex items-center justify-between">
        {label}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit {label.toLowerCase()}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            'text-sm mt-2  bg-neutral-100 border rounded-md p-4',
            !initialData && 'text-slate-500 italic'
          )}
        >
          {!initialData && placeholder}
          {initialData && <Preview value={initialData} />}
        </div>
      )}
      {isEditing && (
        <FormField
          control={control}
          name={name as Path<T>}
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
