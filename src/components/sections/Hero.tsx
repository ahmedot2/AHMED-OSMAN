'use client';
import Image from 'next/image';
import CurvedLoop from '../CurvedLoop';
import SectionWrapper from '../SectionWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

  return (
    <SectionWrapper
      id="hero"
      className="relative min-h-screen"
      ref={targetRef}
    >
      <motion.div style={{ opacity, scale }} className="h-full w-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
        
        <div className="relative flex flex-col items-center justify-center h-full">
          <motion.div style={{ y: yImage }} className="z-10">
            <Image
              src="/portrait.png"
              alt="Portrait of Ahmed Osman"
              width={250}
              height={250}
              data-ai-hint="portrait man"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div style={{ y: yText }} className="relative w-full flex flex-col items-center justify-center z-20 -mt-24">
            <h1 className="font-display font-black uppercase text-center text-[clamp(3.5rem,15vw,8rem)] leading-[0.8] tracking-wider">
                <span className="text-white">AHMED</span>
                <span className="text-primary">
                  OSMAN
                </span>
            </h1>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-8 left-0 z-30 w-full flex justify-center">
        <CurvedLoop 
          marqueeText="Rebel ✦ Entrepreneur ✦ Disruptor ✦ Designer ✦ Author ✦ AI Enthusiast ✦ Blockchain Early Bird ✦ Traveler ✦" 
          direction="left" 
          speed={0.6}
          curveAmount={100}
          className="font-display uppercase text-white fill-current text-[clamp(24px,8vw,50px)]"
        />
      </div>
    </SectionWrapper>
  );
}
