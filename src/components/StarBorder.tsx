'use client';
import './StarBorder.css';
import React from 'react';

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const style = {
    '--border-color': color,
    '--animation-speed': speed,
    ...rest.style,
  } as React.CSSProperties;

  return (
    <Component
      className={`star-border-container ${className}`}
      style={style}
      {...rest}
    >
      <div className="inner-content" style={{ margin: `${thickness}px`}}>
          {children}
      </div>
    </Component>
  );
};

export default StarBorder;
