'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: 'chars' | 'words';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
};

const BlurText = ({
  text,
  className,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}: BlurTextProps) => {
  const getAnimationDirection = () => {
    switch (direction) {
      case 'top':
        return { y: -20 };
      case 'bottom':
        return { y: 20 };
      case 'left':
        return { x: -20 };
      case 'right':
        return { x: 20 };
      default:
        return { y: -20 };
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(8px)',
      ...getAnimationDirection(),
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const items = animateBy === 'chars' ? text.split('') : text.split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
      className={cn('inline-block', className)}
    >
      {items.map((item, index) => (
        <motion.span key={index} variants={itemVariants} className="inline-block">
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;
