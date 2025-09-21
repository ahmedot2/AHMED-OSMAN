'use client';

import SectionWrapper from '../SectionWrapper';

const AnimatedText = ({ text, animation, className }: { text: string; animation: string, className?: string }) => {
  return (
    <span className={`${animation} ${className}`}>
      {text}
    </span>
  );
};

export default function Hero() {
  return (
    <SectionWrapper id="hero" className="justify-center items-center text-center bg-black">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 w-full">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-6">
            <h1 className="font-headline text-8xl md:text-9xl lg:text-[15rem] tracking-tighter text-white uppercase leading-none overflow-hidden">
                <AnimatedText text="Ahmed" animation="animate-slide-in-left" />
            </h1>
            <h1 className="font-headline text-8xl md:text-9xl lg:text-[15rem] tracking-tighter text-primary uppercase leading-none overflow-hidden">
                <AnimatedText text="Osman" animation="animate-slide-in-right" />
            </h1>
        </div>
        <p className="text-white/70 mt-4 md:text-lg max-w-2xl mx-auto animate-stagger-in" style={{ animationDelay: '1s' }}>
          Creative Technologist, AI Innovator, and a lifelong builder of things.
          I turn complex problems into elegant digital experiences.
        </p>
      </div>
    </SectionWrapper>
  );
}
