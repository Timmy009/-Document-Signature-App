import { useMemo } from 'react';
import PropTypes from 'prop-types';
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import { round } from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { getDataAggregateValue, hexColorVariants } from '@/lib/utils';
import { strokes, useColors } from '@/hooks/generic';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/typography/Text/text';
import { Divider } from '@/components/ui/divider';
import { PieChartIcon } from 'hugeicons-react';
import { Empty } from '@/components/ui/empty';
import { Progress } from '@/components/ui/progress';
import { insertSpaces } from '@/services/fileupload/util';

const INITIAL = 0;

const COLOR_TYPE = 'default';
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: // index,
{
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const ProgressLegendList = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  const colors = useColors(COLOR_TYPE);

  if (!data) return null;

  const aggregate = getDataAggregateValue(data) || 1;

  return (
    <div className="px-3 space-y-3">
      {data.map((legend, index) => {
        const color = colors[index % colors.length];

        return (
          <div key={legend.name}>
            <Text
              fontSize="text-sm"
              textColor="text-grey-300"
              casing="capitalize"
            >
              {insertSpaces(legend.name)}
            </Text>
            <div className="flex items-center gap-2">
              <Progress
                value={(legend.value / aggregate) * 100}
                className="bg-[#f7f7f7]"
                childStyle={{
                  backgroundColor: color,
                }}
              />

              <Text fontSize="text-sm">{`${(
                (legend.value / aggregate) *
                100
              ).toFixed(2)}%`}</Text>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface RenderLegendProps {
  payload?: Payload[];
}

export const PieChartLoader = ({ limit = 4 }) => {
  return (
    <div className="flex flex-col space-y-3 items-center p-2">
      <Skeleton className="w-[170px] h-[170px] rounded-full" />
      <div className="space-y-2">
        {Array(limit)
          .fill('*')
          .map((_, i) => (
            <Skeleton key={`pie_label_${i}`} className="h-5 w-20" />
          ))}
      </div>
    </div>
  );
};

const renderLegend = (props: RenderLegendProps) => {
  const { payload } = props;
  return (
    <ScrollContainer
      horizontal={false}
      vertical={true}
      style={{
        // height: '12.5rem',
        width: '9.375rem',
        marginInline: 'auto',
        zIndex: -1,
      }}
    >
      <div
        className="flex items-center flex-wrap space-y-2"
        style={{
          height: '100%',

          overflowY: 'scroll',
          overflowX: 'hidden',
          // '&::-webkit-scrollbar-thumb': {
          //   backgroundColor: grayTextColor,
          // },
        }}
      >
        {payload &&
          payload.map((entry, index) => {
            const val = entry.value;
            if (!val || val?.toLowerCase() === 'total') return null;
            const addTopPadding = payload.length > 4 && index === INITIAL;

            return (
              <div
                className={`flex shrink-0 items-baseline gap-2 ${
                  addTopPadding ? 'p-4' : ''
                }`}
                key={`${entry.value}-${index}`}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: entry.color,
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                <Text
                  fontSize="text-sm"
                  key={`item-${index}`}
                  noOfLines={2}
                  // lineclamp={2}
                  isTruncated={true}
                  casing="capitalize"
                >
                  {val &&
                    val.charAt(0).toUpperCase() +
                      insertSpaces(val.slice(1).split('_').join(' '))}
                </Text>
              </div>
            );
          })}
      </div>
    </ScrollContainer>
  );
};

interface ISharedPieChartProps {
  data: { name: string; value: number }[];
  nameKey: string;
  dataKey: string;
  xLabel: string;
  isDoughnut?: boolean;
  hasLabel?: boolean;
  hasLegend?: boolean;
  loading?: boolean;
}

const SharedPieChart = ({
  data,
  nameKey,
  dataKey,
  xLabel,
  isDoughnut,
  hasLabel,
  hasLegend,
  loading = false,
}: ISharedPieChartProps) => {
  const colors = useColors(COLOR_TYPE);
  const aggregate = getDataAggregateValue(data);

  const renderPie = useMemo(() => {
    return (
      <Pie
        data={data}
        cx={100}
        cy={100}
        labelLine={false}
        label={!isDoughnut && hasLabel && renderCustomizedLabel}
        outerRadius={90}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={nameKey}
        paddingAngle={0}
        innerRadius={isDoughnut ? 46 : 0}
        rootTabIndex={-1}
        tabIndex={-1}
      >
        {data?.map((entry, index) => {
          return (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              fillOpacity={
                hexColorVariants[
                  Math.floor(index / colors.length) % hexColorVariants.length
                ]
              }
              stroke={strokes[index % colors.length]}
            />
          );
        })}
      </Pie>
    );
  }, [colors, data, dataKey, hasLabel, isDoughnut, nameKey]);

  //Custom Tooltip popper
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active) return null;
    const cell = payload && payload[0];

    if (payload && payload[0].name !== undefined) {
      return (
        <Card className="py-2 px-4 max-w-80">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div
                style={{
                  backgroundColor: `${cell?.payload?.fill || ''}`,
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '0.25rem',
                }}
              />
              <Text
                fontSize="text-xs"
                fontWeight="font-medium"
                lineHeight="leading-relaxed"
                casing="capitalize"
              >
                {cell && `${insertSpaces(cell.name ?? '')}`}
              </Text>
            </div>
            <Divider />
            {cell && !!cell.value && (
              <div className="space-y-4">
                <Text
                  fontSize="text-xs"
                  lineHeight="leading-tight"
                  casing="capitalize"
                >
                  {`#Total: ${round(cell.value)}`}
                </Text>
                {!!aggregate && (
                  <Text
                    fontSize="text-xs"
                    lineHeight="leading-tight"
                    casing="capitalize"
                  >
                    {`Percentage: ${((cell.value / aggregate) * 100).toFixed(
                      2
                    )}%`}
                  </Text>
                )}
              </div>
            )}
          </div>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="relative h-full">
      {xLabel && (
        <div className="max-h-[59px]">
          <div className="m-0 p-4">
            {/* <Text asComp="span" fontWeight="font-medium"> */}
            <Text fontWeight="font-medium">{xLabel}</Text>
          </div>
          <Divider />
        </div>
      )}
      {(loading && data?.length <= 0) || !data ? (
        <PieChartLoader limit={0} />
      ) : Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer
          width="100%"
          maxHeight={hasLegend ? 250 : 200}
          minHeight={hasLegend ? 250 : 200}
        >
          {/* <ResponsiveContainer width="100%"> */}
          <PieChart width={200} height={hasLegend ? 250 : 200} endAngle={0}>
            {!!hasLegend && (
              <Legend
                content={renderLegend}
                // width={150}
                // height={}
                // verticalAlign="bottom"
                // align="center"
              />
            )}
            <Tooltip content={<CustomTooltip payload={data} />} />
            {renderPie}
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex place-content-center">
          <Empty
            icon={
              <div className="bg-purple-200 rounded-full p-2">
                <PieChartIcon className="text-purple-900" type="" />
              </div>
            }
            description={`No ${xLabel}`}
            className="py-12 my-12"
          />
        </div>
      )}
    </div>
  );
};

export default SharedPieChart;

SharedPieChart.propTypes = {
  data: PropTypes.array,
  nameKey: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  isDoughnut: PropTypes.bool,
  hasLabel: PropTypes.bool,
  loading: PropTypes.bool,
};
