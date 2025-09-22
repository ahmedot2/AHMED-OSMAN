'use client';
import Image, { ImageProps } from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';

const InteractiveImage = (props: ImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const rotateX = useTransform(mouseY, [0, 500], [15, -15], {
    clamp: false,
  });
  const rotateY = useTransform(mouseX, [0, 300], [-15, 15], {
    clamp: false,
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-auto rounded-lg"
      style={{
        perspective: '800px',
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          y: parallaxY,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out',
        }}
      >
        <Image
          {...props}
          className="rounded-lg object-cover w-full h-full"
          style={{
            transform: 'translateZ(20px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default InteractiveImage;
