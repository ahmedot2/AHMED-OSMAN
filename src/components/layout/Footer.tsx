'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import InteractiveImage from '../InteractiveImage';
import SectionWrapper from '../SectionWrapper';
import DecryptedText from '../DecryptedText';

export default function Footer() {
  const quote = "Code the chaos, author the ascent—futures shaped by intuition's flame.";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  

  return (
    <SectionWrapper
      id="footer"
      ref={containerRef}
      className="bg-gradient-to-t from-gray-900/50 to-black justify-center items-center text-center py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: textY }} className="text-left">
           <DecryptedText
              text={quote}
              animateOn="view"
              revealDirection="left"
              className="font-headline text-4xl lg:text-5xl text-white leading-tight"
              encryptedClassName="text-primary/50"
              highlightedWords={{
                'chaos': 'text-primary',
                'ascent': 'text-primary',
                'flame': 'text-primary',
              }}
            />
        </motion.div>
        <motion.div style={{ y: imageY }} className="w-full max-w-sm mx-auto">
          <InteractiveImage
            src="/footer-image.png"
            alt="Abstract representation of chaos and ascent"
            width={600}
            height={400}
            data-ai-hint="abstract flame"
            className="rounded-lg"
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
