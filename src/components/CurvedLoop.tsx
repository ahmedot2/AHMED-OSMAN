'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect, useState, useMemo, useId } from 'react';

type CurvedLoopProps = {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
};

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 100,
  direction = 'left',
}: CurvedLoopProps) => {
  const textParts = useMemo(() => {
    const textWithTrailingSpace = (marqueeText.endsWith(' ') ? marqueeText : marqueeText + ' ') + '\u00A0';
    return textWithTrailingSpace.split('✦');
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,${150 - curveAmount} C 300,${curveAmount} 900,${curveAmount} 1300,${150 - curveAmount}`;

  const dirRef = useRef(direction);
  const ready = spacing > 0;

  const RenderText = ({ isMeasure = false }: { isMeasure?: boolean }) => (
    <>
      {textParts.map((part, index) => (
        <tspan key={index}>
          {part}
          {index < textParts.length - 1 && (
            <tspan className={isMeasure ? '' : 'fill-primary'}>✦</tspan>
          )}
        </tspan>
      ))}
    </>
  );

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [textParts, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', String(initial));
    }
  }, [spacing]);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame: number;
    const step = () => {
      if (textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const totalTextRepetitions = ready ? Math.ceil(1800 / spacing) + 2 : 1;

  return (
    <div
      className="w-full h-[150px] overflow-hidden"
      style={{ visibility: ready ? 'visible' : 'hidden' }}
    >
      <svg className="w-full h-full" viewBox="0 0 1200 150">
        <text ref={measureRef} y="-9999" x="-9999" xmlSpace="preserve" style={{ visibility: 'hidden', pointerEvents: 'none' }} className={cn('font-display uppercase text-white fill-current text-[24px]', className)}>
          <RenderText isMeasure />
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={cn('font-display uppercase text-white fill-current text-[24px]', className)}>
            <textPath ref={textPathRef} href={`#${pathId}`} xmlSpace="preserve">
              {Array(totalTextRepetitions).fill(0).map((_, i) => <RenderText key={i} />)}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
