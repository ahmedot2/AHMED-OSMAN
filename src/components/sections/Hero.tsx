'use client';

import { useState, useEffect, useRef } from 'react';
import SectionWrapper from '../SectionWrapper';
import Image from 'next/image';

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
    transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -10}px) translateZ(0) scale(1.1)`,
    transition: 'transform 0.1s ease-out',
  };

  const textTransform = {
    transform: `translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 8}px) translateZ(0)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <SectionWrapper id="hero" ref={containerRef} className="!p-0 !h-screen !min-h-[800px] md:!min-h-screen bg-black">
      {/* Mobile Layout */}
      <div className="md:hidden relative w-full h-full flex flex-col justify-center">
        <div className="absolute top-24 left-6 z-20 text-white">
            <h3 className="font-bold text-lg">Creative Technologist</h3>
            <h3 className="font-bold text-lg">AI Innovator</h3>
            <h3 className="font-bold text-lg">Product Designer</h3>
        </div>
        
        <div className="relative flex-grow flex items-center justify-center">
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <Image
              src={`/hero-image.png${cacheBust}`}
              alt="Ahmed Osman Portrait"
              fill
              priority
              className="object-contain object-bottom"
              data-ai-hint="professional portrait"
            />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center justify-center text-center font-headline">
              <h1 className="text-8xl text-white" style={{ letterSpacing: '0.05em', transform: 'translateY(40px)'}}>
                AHMED
              </h1>
              <h1 className="text-8xl text-primary" style={{ letterSpacing: '0.05em', transform: 'translateY(160px)' }}>
                OSMAN
              </h1>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
       <div className="hidden md:flex relative w-full h-full items-center justify-center overflow-hidden">
        <div
          className="absolute z-10 text-white font-headline w-full max-w-7xl mx-auto px-12 flex flex-col items-center"
          style={{ perspective: '1000px', ...textTransform }}
        >
          <h1 className="text-9xl lg:text-[180px] text-center">
            AHMED
          </h1>
          <h1 className="text-9xl lg:text-[180px] text-primary text-center -mt-8 lg:-mt-12">
            OSMAN
          </h1>
        </div>

        <div
          className="absolute inset-0 w-full h-full"
          style={{ perspective: '1000px' }}
        >
          <Image
            src={`/hero-image.png${cacheBust}`}
            alt="Ahmed Osman Portrait"
            fill
            priority
            style={imageTransform}
            className="object-contain object-center"
            data-ai-hint="professional portrait"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
        </div>
         <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white/80 max-w-xs z-20">
            <p className="font-body text-xl lg:text-2xl" style={{ animation: 'slide-in-left 1s ease-out forwards' }}>
                Creative Technologist, AI Innovator, and a lifelong builder of things. I turn complex problems into elegant digital experiences.
            </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
