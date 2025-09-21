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
