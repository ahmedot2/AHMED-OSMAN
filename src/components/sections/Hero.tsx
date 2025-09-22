
'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CurvedLoop from '../CurvedLoop';

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      const rotateX = yPct * -20; // Max rotation
      const rotateY = xPct * 20;  // Max rotation

      setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    const currentRef = heroRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);
    currentRef?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
      currentRef?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="hero"
      ref={heroRef}
      className="h-screen min-h-[700px] w-full snap-start relative flex flex-col justify-center items-center py-16 px-6 sm:px-12 md:px-24 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute top-8 left-0 z-30 w-full flex justify-center">
        <CurvedLoop 
          marqueeText="Rebel ✦ Entrepreneur ✦ Disruptor ✦ Designer ✦" 
          direction="right" 
          speed={2}
          curveAmount={100}
          className="font-display uppercase text-white fill-current text-[24px]"
        />
      </div>

      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
      
      <div className="relative flex flex-col items-center justify-center">
        <div 
          className="z-10"
          style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotate.y}deg) rotateX(${rotate.x}deg)` }}
        >
          <Image
            src="/portrait.png"
            alt="Portrait of Ahmed Osman"
            width={250}
            height={250}
            data-ai-hint="portrait man"
            className="object-cover"
            style={{ transform: 'translateZ(40px)' }}
            priority
          />
        </div>

        <div className="relative w-full flex flex-col items-center justify-center z-20 -mt-24">
          <h1 className="font-display font-black uppercase text-center text-[clamp(2.5rem,18vw,10rem)] leading-[0.8] tracking-wider">
              <span className="text-white">
                AHMED
              </span>
              <span className="text-primary">
                OSMAN
              </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
