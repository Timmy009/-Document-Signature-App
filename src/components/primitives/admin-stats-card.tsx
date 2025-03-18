import React from 'react';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { ContributionsEnum } from '@/dto/courses';
import {
  AssignmentsIcon,
  CourseIcon,
  Mortarboard02Icon,
} from 'hugeicons-react';
import { Skeleton } from '../ui/skeleton';

interface IAdminStatsCardProps {
  title: (typeof ContributionsEnum)[keyof typeof ContributionsEnum];
  value: number;
  icon?: React.ReactNode;
}

export const AdminStatsCard: React.FC<IAdminStatsCardProps> = ({
  title,
  value,
  icon,
}) => {
  const renderLabel = () => {
    switch (title) {
      case 'studyMaterialCount':
        return 'Study materials';
      case 'totalUniqueCourses':
        return 'Courses';
      case 'examCount':
        return 'Tests';

      default:
        return title;
    }
  };
  const renderIcon = () => {
    switch (title) {
      case 'studyMaterialCount':
        return <Mortarboard02Icon color="white" size={20} />;
      case 'totalUniqueCourses':
        return <CourseIcon color="white" size={20} />;
      case 'examCount':
        return <AssignmentsIcon color="white" size={20} />;

      default:
        return null;
    }
  };

  const innerIcon = renderIcon();
  return (
    <Card className="flex justify-between items-center px-5 py-4 w-full min-w-60">
      <div className="space-y-4">
        {icon ||
          (innerIcon && (
            <div className="flex place-content-center max-w-min p-3 items-center bg-primary rounded-full">
              {icon ?? innerIcon}
            </div>
          ))}
        <CardDescription className="font-semibold">
          {renderLabel()}
        </CardDescription>
      </div>

      <CardTitle className="text-3xl">{value}</CardTitle>
    </Card>
  );
};

export const AdminStatsLoader = ({ length = 3 }: { length?: number }) => {
  return (
    <div className="flex gap-4 w-full">
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} className="h-[114px] min-w-60 w-full" />
      ))}
    </div>
  );
};
