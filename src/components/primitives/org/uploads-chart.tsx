import { Text } from '@/components/typography/Text/text';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Divider } from '@/components/ui/divider';
import { insertSpaces } from '@/services/fileupload/util';
import { round } from 'lodash';
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';

const _fontSize = 14;
const _fontWeight = 500;
const _color = '#565656';

interface IChartProps {
  data?: { [key: string]: unknown }[];
  dataKey: string;
  xAxisKey?: string;
  aggregate?: number;
}

export const UploadsChart = ({
  data = [],
  dataKey,
  xAxisKey = 'name',
  aggregate,
}: IChartProps) => {
  // const formatDate =  new Date("2022/5/19 GMT");

  //Custom Tooltip popper
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active) return null;
    const cell = payload && payload[0];

    console.log(payload, '==> payload');

    //performance => fair, above average , good, very good ,great

    if (payload && payload[0].name !== undefined) {
      return (
        <Card className="py-2 px-4 max-w-80">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
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
    <ScrollContainer
      horizontal={true}
      className="h-[308px] max-md:max-w-sm -ml-6"
    >
      <ChartContainer config={{}}>
        <div className={`min-w-[${data.length * 120}px]`}>
          <ResponsiveContainer
            width="100%"
            height="60%"
            minWidth="100%"
            minHeight={308}
          >
            <AreaChart width={728} height={100} data={data}>
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#FFB800"
                // activeDot={false}
                fill="none"
              />
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey={xAxisKey}
                fontSize={_fontSize}
                color={_color}
                fontWeight={_fontWeight}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={_fontSize}
                color={_color}
                fontWeight={_fontWeight}
              />
              <CartesianGrid vertical={false} strokeDasharray="5 5" />

              {/* <Tooltip content={<CustomTooltip payload={data} />} /> */}
              <Tooltip content={<ChartTooltipContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>
    </ScrollContainer>
  );
};
