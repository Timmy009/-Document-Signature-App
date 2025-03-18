import { useMyUploads } from '@/hooks/courses';
import { useUploadTable } from './columns';
import { useForm } from 'react-hook-form';
import { DataTable } from '@/components/controls/data-table';

export const MyUploadsTable: React.FC<{ label?: string }> = ({ label }) => {
  const form = useForm({
    defaultValues: {
      currentPage: 1,
      nextPage: 2,
      size: 10,
    },
  });

  const watchForm = form.watch();

  const { uploads } = useMyUploads({
    page: watchForm.currentPage,
    size: watchForm.size,
  });
  const { columns, data } = useUploadTable({ uploads });

  return (
    <DataTable
      label={label}
      columns={columns}
      data={data}
      caption="A list of your uploads."
    />
  );
};
