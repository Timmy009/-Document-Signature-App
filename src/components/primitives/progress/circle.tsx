import { useEffect, useState, useRef, useMemo } from 'react';

type Props = {
  size?: number;
  progress: number;
  strokeWidth?: number;
  showText?: boolean;
  circleOneStroke?: string;
  circleTwoStroke?: string;
  strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square' | undefined;
};
export const CircularProgressBar: React.FC<Props> = (props) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const {
    size = 32,
    progress,
    strokeWidth = 4,
    showText = false,
    circleOneStroke = '#dde0ef',
    circleTwoStroke = '#1e2f97',
    strokeLinecap = 'inherit',
  } = props;

  const center = useMemo(() => size / 2, [size]);
  const radius = useMemo(() => size / 2 - strokeWidth / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);

    if (circleRef.current) {
      circleRef.current.setAttribute(
        'style',
        'transition: stroke-dashoffset 850ms ease-in-out'
      );
    }
  }, [setOffset, progress, circumference, offset]);

  return (
    <>
      <svg className="progress-svg" width={size} height={size}>
        <circle
          className="progress-svg-circle-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-svg-circle"
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap={strokeLinecap}
        />
        {showText && (
          <text
            x={`${center}`}
            y={`${center + 4}`}
            className="progress-svg-circle-text"
          >
            {progress}%
          </text>
        )}
      </svg>
      <style>{`
        .progress-svg {
          display: block;
          max-width: 100%;
        }

        .progress-svg-circle-bg {
          fill: none;
        }

        .progress-svg-circle {
          fill: none;
        }

        .progress-svg-circle-text {
          font-size: 0.75rem;
          text-anchor: middle;
          fill: #494949;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};
