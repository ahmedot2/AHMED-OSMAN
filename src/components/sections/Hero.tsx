'use client';
import SectionWrapper from '../SectionWrapper';

export default function Hero() {
  return (
    <SectionWrapper id="hero" hasBackground>
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
        
        <div className="hero-title font-display font-black text-center uppercase text-[clamp(4rem,15vw,12rem)] leading-[0.9] tracking-tighter">
          <span className="text-white">AHMED</span>
          <span className="text-primary">OSMAN</span>
        </div>

        <div className="max-w-xl text-center mt-4">
          <p className="text-white/70 text-lg">
            Creative Technologist, AI Innovator, and a lifelong builder of
            things. I turn complex problems into elegant digital experiences.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
