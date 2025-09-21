'use client';
import SectionWrapper from '../SectionWrapper';

export default function Hero() {
  return (
    <SectionWrapper id="hero" hasBackground>
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
        
        {/* SVG container for scalable text */}
        <svg viewBox="0 0 1200 200" className="w-full h-auto">
          <text 
            x="50%" 
            y="50%" 
            dy=".35em" 
            textAnchor="middle" 
            className="font-headline text-[180px] leading-none tracking-tighter"
          >
            <tspan className="fill-white">MED</tspan>
            <tspan className="fill-primary">OSM</tspan>
          </text>
        </svg>

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
