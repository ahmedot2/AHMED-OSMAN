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
  const fullText = `${marqueeText} ${marqueeText}`;

  // Ensure the curve amount is within a reasonable range
  const clampedCurve = Math.max(10, Math.min(curveAmount, 500));
  const pathDefinition = `M 0,${clampedCurve} C 0,${clampedCurve} 300,${-clampedCurve} 600,${clampedCurve}`;

  useEffect(() => {
    let animationFrameId: number;
    const textPath = textPathRef.current;
    if (!textPath) return;

    let startOffset = 0;
    
    // Set initial position for right-to-left for seamless start
    if (direction === 'right') {
        try {
            const textLength = textPath.getComputedTextLength() / 2;
            if(textLength > 0) {
                startOffset = -textLength;
            }
        } catch(e) {
            // Can throw error in some cases, ignore
        }
    }


    const animate = () => {
      // Use a fixed value for speed to make it independent of text length
      const animationSpeed = speed / 5;

      if (direction === 'left') {
        startOffset -= animationSpeed;
        const textLength = textPath.getComputedTextLength() / 2;
        if (startOffset <= -textLength) {
          startOffset += textLength;
        }
      } else { // 'right'
        startOffset += animationSpeed;
        const textLength = textPath.getComputedTextLength() / 2;
        if (startOffset >= 0) {
          startOffset -= textLength;
        }
      }
      
      textPath.setAttribute('startOffset', `${startOffset}`);
      animationFrameId = requestAnimationFrame(animate);
    };

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
