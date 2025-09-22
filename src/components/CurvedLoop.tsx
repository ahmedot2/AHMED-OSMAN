'use client';

import { cn } from '@/lib/utils';
import { useId, useRef, useEffect, useState } from 'react';

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
  const textPathRef = useRef<SVGTextPathElement>(null);

  // Ensure the curve amount is within a reasonable range
  const clampedCurve = Math.max(10, Math.min(curveAmount, 500));
  const pathDefinition = `M 0,${clampedCurve} C 0,${clampedCurve} 300,${-clampedCurve} 600,${clampedCurve}`;

  const fullText = `${marqueeText} ${marqueeText}`;

  useEffect(() => {
    let animationFrameId: number;
    const textPath = textPathRef.current;
    if (!textPath) return;
    
    let startOffset = 0;
    const animate = () => {
      const textLength = textPath.getComputedTextLength() / 2; // Length of a single instance of the text
      const animationSpeed = (speed / 10) * (textLength / 600);

      if (direction === 'left') {
        startOffset -= animationSpeed;
        if (startOffset <= -textLength) {
          startOffset += textLength;
        }
      } else {
        startOffset += animationSpeed;
        if (startOffset >= 0) {
          startOffset -= textLength;
        }
      }
      
      textPath.setAttribute('startOffset', `${startOffset}`);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize position for right-to-left
    if (direction === 'right' && textPathRef.current) {
        const textLength = textPathRef.current.getComputedTextLength() / 2;
        startOffset = -textLength;
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, direction, marqueeText]);


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
            ref={textPathRef}
            href={`#${pathId}`}
          >
            {fullText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
