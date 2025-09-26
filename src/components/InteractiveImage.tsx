'use client';
import Image, { ImageProps } from 'next/image';
import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const InteractiveImage = (props: ImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <motion.div
      ref={ref}
      className="w-full h-auto rounded-lg"
    >
      <motion.div
        className="w-full h-full"
        style={{
          y: parallaxY,
          transformStyle: 'preserve-3d',
        }}
      >
        <Image
          {...props}
          className="rounded-lg object-cover w-full h-full"
          style={{
            transform: 'translateZ(20px)',
            boxShadow: '0 10px 30px -5px rgba(255, 255, 255, 0.1), 0 8px 15px -10px rgba(255, 255, 255, 0.1)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default InteractiveImage;
