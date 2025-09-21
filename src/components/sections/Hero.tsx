'use client';

import SectionWrapper from '../SectionWrapper';

export default function Hero() {
  return (
    <SectionWrapper id="hero" className="justify-center items-center text-center bg-black">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 w-full animate-stagger-in flex justify-center items-center">
        <div className="animate-slide-in-left">
            <span className="font-headline text-8xl md:text-9xl lg:text-[20rem] tracking-tighter uppercase leading-none text-white">
                Ahm
            </span>
        </div>
        <div className="animate-slide-in-right">
            <span className="font-headline text-8xl md:text-9xl lg:text-[20rem] tracking-tighter uppercase leading-none text-primary">
                osm
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
