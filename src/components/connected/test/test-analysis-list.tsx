import { AdminStatsLoader } from '@/components/primitives/admin-stats-card';
import { CircularProgressBar } from '@/components/primitives/progress/circle';
import {
  IStatsCardProps,
  StatsCard,
} from '@/components/primitives/study-materials/stats-card';
import { Empty } from '@/components/ui/empty';
import { ISubmissionTestAnalysis } from '@/dto/test';
import { MessageDone02Icon, Time02Icon } from 'hugeicons-react';
import { PieChart } from 'recharts';

interface ITestAnalysisListProps {
  analysis: ISubmissionTestAnalysis;
  loading?: boolean;
}

export const TestAnalysisList = ({
  analysis,
  loading,
}: ITestAnalysisListProps) => {
  if (!analysis) return;
  const entries = Object.entries(analysis);
  const list = [
    'accuracyPercentage',
    'completedPercentage',
    'averageCompletionTime',
    'totalSubmissions',
  ];

  const renderStatProps = (
    key: keyof typeof analysis,
    value: number
  ): IStatsCardProps | null => {
    switch (key) {
      case 'accuracyPercentage':
        return {
          icon: (
            <CircularProgressBar
              size={50}
              progress={value}
              strokeWidth={8}
              strokeLinecap="round"
              circleOneStroke="#FFE9B0"
              circleTwoStroke="#FFB800"
              showText
            />
          ),
          subTitle: 'Accuracy',
        };
      case 'averageCompletionTime':
        return {
          icon: <Time02Icon className="text-[#2ECC71]" />,
          title: String(analysis['averageCompletionTime']),
          subTitle: 'Avg. Complete Time',
        };
      case 'completedPercentage':
        return {
          icon: (
            <CircularProgressBar
              size={50}
              progress={value}
              strokeWidth={8}
              strokeLinecap="round"
              circleTwoStroke="#02BA6D"
              circleOneStroke="#E6F8F0"
              showText
            />
          ),
          subTitle: 'Completed',
        };
      case 'totalSubmissions':
        return {
          icon: <MessageDone02Icon className="text-[#2ECC71]" />,
          title: String(analysis['totalSubmissions']),
          subTitle: 'Submission',
        };

      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <AdminStatsLoader />
      ) : entries.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {list.map((key) => {
            const value = analysis[key as keyof typeof analysis];
            const props = renderStatProps(key as keyof typeof analysis, value);
            if (!props) return;

            return (
              <StatsCard
                key={key}
                {...props}
                className="flex-1 max-md:max-w-full"
              />
            );
          })}
        </div>
      ) : (
        <Empty
          icon={
            <div className="bg-purple-200 rounded-full p-2">
              <PieChart className="text-purple-600" />
            </div>
          }
          description="No Exam statistics data"
          className="my-5"
        />
      )}
    </>
  );
};
