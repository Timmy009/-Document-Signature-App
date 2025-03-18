import { Skeleton } from '@/components/ui/skeleton';
import { getRandomInt } from '@/lib/utils';
import { motion } from 'motion/react';

interface IChartSkeletonLoaderProps {
  length?: number;
}

export const ChartSkeletonLoader: React.FC<IChartSkeletonLoaderProps> = ({
  length = 10,
}) => {
  return (
    <div className="flex justify-between items-end gap-3 mx-6 min-h-60">
      {Array.from({ length }).map((_, index) => {
        const height = (getRandomInt(10) + 1) * 30;

        return (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height }}
            key={`chart_${index}`}
            style={{ height }}
            className={'w-10'}
          >
            <Skeleton key={`chart_${index}`} className="h-full w-full" />
          </motion.div>
        );
      })}
    </div>
  );
};
