'use client';

import { useState, useEffect, useRef } from 'react';
import SectionWrapper from '../SectionWrapper';
import Image from 'next/image';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  const [cacheBust, setCacheBust] = useState('');

  useEffect(() => {
    // This runs only on the client, preventing hydration mismatch errors.
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
    <SectionWrapper ref={containerRef} id="hero" className="justify-center items-center text-center bg-black" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div 
        className="relative z-10 w-full animate-stagger-in flex justify-center items-center"
      >
        <div className="animate-slide-in-left" style={textTransformLeft}>
            <span className="font-headline text-8xl md:text-9xl lg:text-[10rem] tracking-tighter uppercase leading-none text-white">
                AHMED
            </span>
        </div>
        
        <div className="w-40 h-60 md:w-56 md:h-80 lg:w-72 lg:h-[28rem] relative z-0 mx-[-2rem] md:mx-[-3rem] lg:mx-[-4rem]" style={{ transformStyle: 'preserve-3d' }}>
          {cacheBust && <Image
            src={`/hero-image.png${cacheBust}`}
            alt="Ahmed Osman"
            fill
            className="object-contain"
            style={imageTransform}
            priority
          />}
        </div>

        <div className="animate-slide-in-right" style={textTransformRight}>
            <span className="font-headline text-8xl md:text-9xl lg:text-[10rem] tracking-tighter uppercase leading-none text-primary">
                OSMAN
            </span>
        </div>
      </div>

       <p className="text-white/70 mt-4 md:text-xl max-w-2xl mx-auto absolute bottom-[30%]" style={{ animationDelay: '0.5s' }}>
          Creative Technologist, AI Innovator, and a lifelong builder of things.
          I turn complex problems into elegant digital experiences.
        </p>
    </SectionWrapper>
  );
}
