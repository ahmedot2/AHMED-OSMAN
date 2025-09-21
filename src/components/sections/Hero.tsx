'use client';

import SectionWrapper from '../SectionWrapper';

const StaggeredText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block animate-stagger-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  return (
    <SectionWrapper id="hero" className="items-center text-center bg-black">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10">
        <h1 className="font-headline text-8xl md:text-9xl lg:text-[15rem] tracking-tighter text-white uppercase leading-none">
          <StaggeredText text="Ahmed" />
          <br />
          <span className="text-primary"><StaggeredText text="Osman" /></span>
        </h1>
        <p className="text-white/70 mt-4 md:text-lg max-w-2xl mx-auto animate-stagger-in" style={{ animationDelay: '0.5s' }}>
          Creative Technologist, AI Innovator, and a lifelong builder of things.
          I turn complex problems into elegant digital experiences.
        </p>
      </div>
    </SectionWrapper>
  );
}
