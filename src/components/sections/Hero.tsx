'use client';

import { useState, useEffect } from 'react';
import SectionWrapper from '../SectionWrapper';
import Image from 'next/image';

export default function Hero() {
  const [cacheBust, setCacheBust] = useState('');

  useEffect(() => {
    setCacheBust(`?t=${new Date().getTime()}`);
  }, []);

  return (
    <SectionWrapper id="hero" hasBackground className="flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center justify-center w-full">
            <div className="relative w-full aspect-[4/3] max-w-sm mb-4">
                 <Image
                    src={`/hero-image.png${cacheBust}`}
                    alt="Ahmed Osman Portrait"
                    fill
                    priority
                    className="object-contain object-center"
                    data-ai-hint="professional portrait"
                />
            </div>
            <h1 className="font-headline text-7xl text-white">AHMED</h1>
            <h1 className="font-headline text-7xl text-primary">OSMAN</h1>
            <p className="text-white/80 mt-6 max-w-md text-lg">
                Creative Technologist, AI Innovator, and a lifelong builder of things. I turn complex problems into elegant digital experiences.
            </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="font-headline text-white text-[180px] lg:text-[220px] xl:text-[250px] leading-none tracking-tighter">
              AHMED
            </span>
            <div className="absolute left-1/2 -translate-x-[-7.5%] w-[180px] h-[220px] lg:w-[200px] lg:h-[240px] xl:w-[230px] xl:h-[280px]">
              <div className="absolute inset-0 bg-white mix-blend-difference z-10"></div>
              <div className="relative w-full h-full z-0">
                <Image
                  src={`/hero-image.png${cacheBust}`}
                  alt="Ahmed Osman Portrait"
                  fill
                  priority
                  className="object-contain object-bottom"
                  data-ai-hint="professional portrait"
                />
              </div>
            </div>
            <span className="font-headline text-primary text-[180px] lg:text-[220px] xl:text-[250px] leading-none tracking-tighter">
              OSMAN
            </span>
          </div>

          <p className="text-white/80 mt-6 max-w-2xl text-lg">
            Creative Technologist, AI Innovator, and a lifelong builder of things. I turn complex problems into elegant digital experiences.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
