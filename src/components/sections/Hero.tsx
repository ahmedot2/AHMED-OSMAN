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

  const textTransform = (multiplier: number) => ({
    transform: `translateX(${mousePosition.x * multiplier}px) translateY(${mousePosition.y * (multiplier / 2)}px) translateZ(0)`,
  });

  const imageTransform = {
    transform: `translateX(${mousePosition.x * -5}px) translateY(${mousePosition.y * -3}px) translateZ(0) scale(1.05)`,
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
       <div className="hidden md:flex relative w-full h-full items-center justify-between overflow-hidden px-12" style={{ perspective: '1000px' }}>
            {/* Left Titles */}
            <div className="text-white/80 max-w-xs z-30 self-center" style={textTransform(10)}>
                <div className="font-headline text-2xl text-white font-medium flex flex-col" style={{lineHeight: 1.2, letterSpacing: '0.05em'}}>
                    <span>Creative Technologist</span>
                    <span>AI Innovator</span>
                    <span>Product Designer</span>
                </div>
            </div>

            {/* Center Content */}
            <div className='flex items-center justify-center flex-1'>
              <h1 className="text-9xl lg:text-[180px] text-white font-headline leading-none tracking-tighter" style={textTransform(20)}>
                AHMED
              </h1>
              
              <div className="relative z-10 w-[300px] h-[450px] mx-8 shrink-0" style={imageTransform}>
                <Image
                  src={`/hero-image.png${cacheBust}`}
                  alt="Ahmed Osman Portrait"
                  fill
                  priority
                  className="object-contain object-center"
                  data-ai-hint="professional portrait"
                />
              </div>

              <h1 className="text-9xl lg:text-[180px] text-primary font-headline leading-none tracking-tighter" style={textTransform(20)}>
                OSMAN
              </h1>
            </div>

            {/* Right Passion Statement */}
            <div className="text-white/80 max-w-xs z-30 text-right self-center" style={textTransform(10)}>
                <p className="font-body text-lg" style={{lineHeight: 1.5}}>
                    My passion is creating meaningful products for the world that solves real problems, delights users and exceeds expectations.
                </p>
            </div>
      </div>
    </SectionWrapper>
  );
}
