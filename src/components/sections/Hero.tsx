'use client';
import SectionWrapper from '../SectionWrapper';

export default function Hero() {
  return (
    <SectionWrapper id="hero" hasBackground>
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
        <div className="flex justify-center items-center w-full overflow-hidden">
            <div className="font-headline text-[240px] leading-none tracking-tighter whitespace-nowrap">
                <span className="text-white">AHMED</span>
                <span className="text-primary">OSMAN</span>
            </div>
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
