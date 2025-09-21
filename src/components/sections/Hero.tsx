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
    transform: `translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 8}px) translateZ(0)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <SectionWrapper ref={containerRef} id="hero" className="justify-start md:justify-center items-center text-center bg-black pt-16 md:pt-0" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Mobile-only Text Block */}
      <div className="md:hidden w-full px-4 mb-4 z-20">
        <div className="grid grid-cols-2 gap-4 text-left">
            <div>
                <h2 className="text-base font-bold text-white">Creative Technologist</h2>
                <h2 className="text-base font-bold text-white">AI Innovator</h2>
                <h2 className="text-base font-bold text-white">Product Designer</h2>
            </div>
            <div>
                <p className="text-xs text-white/70">
                    My passion is creating meaningful products for the world that solves real user problems, delights users and exceeds expectations.
                </p>
            </div>
        </div>
      </div>
      
      {/* Combined Layout for Desktop and Mobile */}
      <div className={cn(
        "relative z-10 w-full flex justify-center items-center",
        "md:flex-row", // Desktop: row layout
        "flex-col" // Mobile: column layout
      )}>
        <div className="animate-slide-in-left" style={textTransformLeft}>
            <span className={cn(
              "font-headline tracking-tighter uppercase leading-none text-white",
              "text-7xl", // Mobile font size
              "md:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]" // Desktop font sizes
            )}>
                AHMED
            </span>
        </div>
        
        <div 
          className={cn(
            "relative z-0",
            // Desktop dimensions & margin
            "w-48 h-72 sm:w-56 sm:h-80 md:w-64 md:h-96 lg:w-80 lg:h-[32rem]",
            "mx-[-1.5rem] sm:mx-[-2.5rem] md:mx-[-3.5rem] lg:mx-[-4.5rem]",
            // Mobile dimensions & margin
            "w-full h-80 -my-10"
          )} 
          style={{ transformStyle: 'preserve-3d' }}
        >
          {cacheBust && <Image
            src={`/hero-image.png${cacheBust}`}
            alt="Ahmed Osman"
            fill
            className={cn(
              "object-contain", // Desktop
              "md:object-contain", 
              "object-cover object-top" // Mobile
            )}
            style={imageTransform}
            priority
          />}
        </div>

        <div className="animate-slide-in-right" style={textTransformRight}>
            <span className={cn(
              "font-headline tracking-tighter uppercase leading-none text-primary",
              "text-7xl", // Mobile font size
              "md:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]" // Desktop font sizes
            )}>
                OSMAN
            </span>
        </div>
      </div>
      
       <p className="text-white/70 mt-4 text-base md:text-xl max-w-2xl mx-auto absolute bottom-[25%] sm:bottom-[30%] hidden md:block z-20" style={{ animationDelay: '0.5s' }}>
          Creative Technologist, AI Innovator, and a lifelong builder of things.
          I turn complex problems into elegant digital experiences.
        </p>
    </SectionWrapper>
  );
}
