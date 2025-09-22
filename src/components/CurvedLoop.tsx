'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect, useState, useMemo, useId } from 'react';

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
  const pathDefinition = `M 0,${clampedCurve} C 0,${clampedCurve} 300,${-clampedCurve} 600,${clampedCurve}`;

  return (
    <div
      className={cn(
        'relative w-[600px] h-[300px]',
        'group/curved-loop',
        interactive && '[&_text]:hover:[animation-play-state:paused]',
        className
      )}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 600 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id={pathId} d={pathDefinition} />
        </defs>
        <text
          className="font-display uppercase text-white fill-current text-[24px]"
        >
          <textPath 
            href={`#${pathId}`}
          >
             <animate
              attributeName="startOffset"
              from={direction === 'left' ? '0%' : '100%'}
              to={direction === 'left' ? '100%' : '0%'}
              begin="0s"
              dur={`${speed}s`}
              repeatCount="indefinite"
            />
            {marqueeText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}