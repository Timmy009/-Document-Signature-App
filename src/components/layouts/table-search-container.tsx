import { PropsWithChildren } from 'react';
import { FormInput } from '../ui/form';
import { Search02Icon } from 'hugeicons-react';

interface ITableSearchHeaderProps {}

export const TableSearchContainer = ({
  children,
}: PropsWithChildren<ITableSearchHeaderProps>) => {
  return (
    <div className="border border-grey-100 rounded-lg">
      <div className="py-3 px-4 bg-[#f5f5f5] rounded-t-lg border-grey-100">
        <FormInput
          className="bg-white w-[24rem]"
          leftIcon={<Search02Icon size={18} />}
          placeholder="Search for names of student"
          fullWidth={false}
        />
      </div>
      {children}
    </div>
  );
};
