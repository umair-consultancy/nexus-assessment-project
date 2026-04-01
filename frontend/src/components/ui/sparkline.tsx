'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  showPoints?: boolean;
  showArea?: boolean;
  animate?: boolean;
}

export default function Sparkline({
  data,
  width = 120,
  height = 40,
  color = '#C8622E',
  strokeWidth = 2,
  showPoints = false,
  showArea = true,
  animate = true,
}: SparklineProps) {
  const { path, areaPath, points } = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const xStep = width / (data.length - 1);
    const yScale = height / range;

    const points = data.map((value, index) => ({
      x: index * xStep,
      y: height - (value - min) * yScale,
    }));

    const path = points
      .map((point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        const prevPoint = points[index - 1];
        const cp1x = prevPoint.x + (point.x - prevPoint.x) * 0.5;
        const cp1y = prevPoint.y;
        const cp2x = point.x - (point.x - prevPoint.x) * 0.5;
        const cp2y = point.y;
        return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
      })
      .join(' ');

    const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

    return { path, areaPath, points };
  }, [data, width, height]);

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} overflow="visible">
        {showArea && (
          <motion.path
            d={areaPath}
            fill={color}
            fillOpacity="0.1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        {showPoints && points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={3}
            fill={color}
            className="transition-opacity hover:opacity-100 opacity-0"
          />
        ))}
      </svg>
    </div>
  );
}