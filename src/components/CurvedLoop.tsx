'use client';

import { cn } from '@/lib/utils';
import { useId } from 'react';

type CurvedLoopProps = {
  marqueeText: string;
  speed?: number; // Animation duration in seconds
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  className?: string;
};

export default function CurvedLoop({
  marqueeText,
  speed = 10,
  curveAmount = 100,
  direction = 'left',
  interactive = true,
  className,
}: CurvedLoopProps) {
  const uniqueId = useId();
  const pathId = `curve-path-${uniqueId}`;

  // Ensure the curve amount is within a reasonable range
  const clampedCurve = Math.max(10, Math.min(curveAmount, 500));
  const pathDefinition = `M 0,${clampedCurve} C 0,${clampedCurve} ${150},${-clampedCurve / 2} 300,${clampedCurve}`;

  return (
    <div
      className={cn(
        'relative w-[300px] h-[300px]',
        'group/curved-loop',
        interactive && '[&_text]:hover:[animation-play-state:paused]',
        className
      )}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 300 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id={pathId} d={pathDefinition} />
        </defs>
        <text
          className="font-display uppercase text-white fill-current text-[24px]"
          style={
            {
              '--speed': `${speed}s`,
              '--direction': direction === 'left' ? 'normal' : 'reverse',
              animation: 'marquee var(--speed) linear infinite var(--direction)',
            } as React.CSSProperties
          }
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {marqueeText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
