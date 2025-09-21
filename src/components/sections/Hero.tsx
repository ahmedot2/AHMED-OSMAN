'use client';

import SectionWrapper from '../SectionWrapper';
import Image from 'next/image';

export default function Hero() {

  return (
    <SectionWrapper id="hero" className="flex items-center justify-center min-h-screen p-0">
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <h1 className="font-headline text-[20vw] lg:text-[25vw] font-black text-primary leading-none select-none text-center uppercase" style={{ color: '#FF2D2D' }}>
            Work For You
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 w-full h-full max-w-7xl mx-auto items-center">
          
          {/* Left Column */}
          <div className="hidden md:flex flex-col items-start justify-center text-left p-8 col-span-1">
            <h2 className="text-2xl font-medium text-white">Rebel</h2>
            <h2 className="text-2xl font-medium text-white">Entrepreneur</h2>
            <h2 className="text-2xl font-medium text-white">Disruptor</h2>
            <h2 className="text-2xl font-medium text-white">Designer</h2>
          </div>

          {/* Center Column (Image) */}
          <div className="relative col-span-1 md:col-span-2 flex items-center justify-center h-full">
            <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] lg:w-[500px] lg:h-[750px]">
                <Image
                    src={`/hero-image.png`}
                    alt="Ahmed Osman Portrait"
                    fill
                    priority
                    className="object-contain object-bottom grayscale"
                    data-ai-hint="professional portrait"
                />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="hidden md:flex flex-col items-start justify-center text-left p-8 col-span-1">
            <p className="text-lg text-white/80">
              My passion is creating meaningful products for the world that solves real problems, delights users and exceeds expectations.
            </p>
          </div>

        </div>

         {/* Mobile Only Content */}
        <div className="md:hidden absolute bottom-24 left-6 right-6 text-center z-20 p-4 bg-black/50 rounded-lg">
            <h2 className="text-xl font-medium text-white">Rebel, Entrepreneur, Disruptor, Designer</h2>
            <p className="text-base text-white/80 mt-2">
              My passion is creating meaningful products for the world.
            </p>
        </div>

      </div>
    </SectionWrapper>
  );
}
