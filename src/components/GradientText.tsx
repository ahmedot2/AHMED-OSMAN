'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors: string[];
  animationSpeed?: number;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  colors,
  animationSpeed = 5,
}) => {
  const gradientStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: `gradient-animation ${animationSpeed}s ease infinite`,
  };

  return (
    <span style={gradientStyle} className={cn(className)}>
      {children}
    </span>
  );
};

export default GradientText;
