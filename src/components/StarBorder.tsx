'use client';
import './StarBorder.css';

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        '--border-color': color,
        '--animation-speed': speed,
        ...rest.style,
      }}
      {...rest}
    >
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
