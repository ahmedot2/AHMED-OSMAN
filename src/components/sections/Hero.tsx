'use client';

import { useState, useEffect, useRef } from 'react';
import SectionWrapper from '../SectionWrapper';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  const [cacheBust, setCacheBust] = useState('');

  useEffect(() => {
    setCacheBust(`?t=${new Date().getTime()}`);

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = event;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) / (width / 2);
        const y = (clientY - (top + height / 2)) / (height / 2);
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const imageTransform = {
    transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -10}px) translateZ(0) scale(1.2)`,
    transition: 'transform 0.1s ease-out',
  };

  const textTransformLeft = {
    transform: `translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 8}px) translateZ(0)`,
    transition: 'transform 0.1s ease-out',
  };
  
  const textTransformRight = {
    transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -8}px) translateZ(0)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <SectionWrapper id="hero" ref={containerRef} className="!p-0 !h-screen !min-h-[800px] md:!min-h-screen">
      {/* Mobile Layout */}
      <div className="md:hidden relative w-full h-full flex flex-col">
        <div className="z-20 p-6 pt-20 bg-black">
          <div className="grid grid-cols-2 gap-4 text-white">
            <div>
              <h3 className="font-bold text-lg">Creative Technologist</h3>
              <h3 className="font-bold text-lg">AI Innovator</h3>
              <h3 className="font-bold text-lg">Product Designer</h3>
            </div>
          </div>
        </div>
        
        <div className="relative flex-grow flex items-center justify-center -mt-16">
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <Image
              src={`/hero-image.png${cacheBust}`}
              alt="Ahmed Osman Portrait"
              fill
              priority
              className="object-cover object-top"
              data-ai-hint="professional portrait"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center justify-center text-center text-white font-headline">
              <h1 className="text-8xl" style={{...textTransformLeft, letterSpacing: '0.05em'}}>
                AHMED
              </h1>
              <h1 className="text-8xl" style={{...textTransformRight, letterSpacing: '0.05em'}}>
                OSMAN
              </h1>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex relative w-full h-full items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          <Image
            src={`/hero-image.png${cacheBust}`}
            alt="Ahmed Osman Portrait"
            fill
            priority
            style={imageTransform}
            className="object-cover object-center"
            data-ai-hint="professional portrait"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-12 flex flex-col items-start text-left text-white font-headline">
          <div className="flex">
            <h1 className="text-9xl lg:text-[180px]" style={textTransformLeft}>
              AHMED
            </h1>
          </div>
          <div className="flex">
            <h1 className="text-9xl lg:text-[180px] -mt-4 lg:-mt-8" style={textTransformRight}>
              OSMAN
            </h1>
          </div>
          <p className="font-body text-xl lg:text-2xl max-w-lg mt-4 text-white/80" style={{ animation: 'slide-in-left 1s ease-out forwards' }}>
            Creative Technologist, AI Innovator, and a lifelong builder of things. I turn complex problems into elegant digital experiences.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
