'use client';

import { useState, useEffect, useRef } from 'react';
import SectionWrapper from '../SectionWrapper';
import Image from 'next/image';

export default function Hero() {
  const [cacheBust, setCacheBust] = useState('');

  useEffect(() => {
    setCacheBust(`?t=${new Date().getTime()}`);
  }, []);

  return (
    <SectionWrapper id="hero" className="!p-0 !h-screen !min-h-[800px] md:!min-h-screen bg-black">
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
       <div className="hidden md:flex relative w-full h-full items-center justify-center overflow-hidden px-12">
          <div className='flex items-center justify-center w-full max-w-7xl mx-auto'>
            {/* Left Titles */}
            <div className="font-headline text-2xl text-white font-medium flex flex-col flex-shrink-0" style={{lineHeight: 1.2, letterSpacing: '0.05em'}}>
                <span>Creative Technologist</span>
                <span>AI Innovator</span>
                <span>Product Designer</span>
            </div>

            {/* Center Name */}
            <div className='flex-grow flex items-center justify-center'>
              <h1 className="text-9xl lg:text-[160px] text-white font-headline leading-none tracking-tight mx-8">
                AHMED
              </h1>
            </div>
            
            {/* Right Image */}
            <div className="relative z-10 w-[300px] h-[450px] shrink-0">
              <Image
                src={`/hero-image.png${cacheBust}`}
                alt="Ahmed Osman Portrait"
                fill
                priority
                className="object-contain object-center"
                data-ai-hint="professional portrait"
              />
            </div>
          </div>
      </div>
    </SectionWrapper>
  );
}
