import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FileUploadBox } from '@/components/controls/fileupload/uploadbox';
import { Button } from '@/components/ui/button';
import { CircularProgressBar } from '@/components/primitives/progress/circle';
import { CourseSchema } from '@/zod/courses';
import { toast } from 'sonner';

// ✅ Define Schema
const formSchema = z.object({
  coverImage: z.instanceof(File, { message: "Please upload a valid file" }),
});

export const StudyMaterialForm: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      coverImage: null,
    },
    resolver: zodResolver(formSchema),
    mode: 'onChange', // Validate on change
  });

  // ✅ Handle Form Submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.coverImage) {
 
      toast.success('Please upload a file', {});
      return;
    }
  
    // ✅ Create a Blob URL for the file
    const fileUrl = URL.createObjectURL(values.coverImage);
  
    // ✅ Navigate to the signature page with the correct fileUrl
    navigate("/sign/signature", {
      state: {
        fileName: values.coverImage.name,
        fileUrl: fileUrl,  // ✅ Pass the correct fileUrl
      },
    });
  };
  
  return (
    <div className="border w-full px-6 py-8 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          
          {/* ✅ File Upload */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <FileUploadBox
                      onDropFiles={(file) => {
                        if (file.length > 0) {
                          form.setValue("coverImage", file[0].file);
                          form.trigger("coverImage"); // ✅ Trigger validation
                        }
                      }}
                    />
                    {uploadProgress > 0 && <CircularProgressBar progress={uploadProgress} />}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* ✅ Submit Button */}
          <div className="flex w-full justify-end">
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Proceed
            </Button>
          </div>
          
        </form>
      </Form>
    </div>
  );
};
