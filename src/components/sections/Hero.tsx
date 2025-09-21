'use client';
import { useEffect, useRef } from 'react';
import SectionWrapper from '../SectionWrapper';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroRef.current;
      const xPos = (clientX / offsetWidth - 0.5) * 40;
      const yPos = (clientY / offsetHeight - 0.5) * 40;

      const layers = heroRef.current.querySelectorAll<HTMLElement>('[data-layer]');
      layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed') || '0');
        const x = xPos * speed;
        const y = yPos * speed;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <SectionWrapper id="hero" hasBackground ref={heroRef}>
        <div className="relative w-full h-full flex flex-col items-center justify-center -mt-16">
            <div className="relative flex items-center justify-center">
                <div data-layer data-speed="0.2" className="relative">
                    <h1 className="font-headline text-white text-[15vw] md:text-[180px] lg:text-[240px] leading-none tracking-tighter">AHMED</h1>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div 
                            className="bg-white mix-blend-difference"
                            style={{ width: '22%', height: '110%', marginLeft: '38%' }}
                        ></div>
                    </div>
                </div>
                <div 
                    data-layer 
                    data-speed="0.4"
                    className="absolute w-[18vw] h-[25vw] md:w-[220px] md:h-[310px] lg:w-[290px] lg:h-[400px]"
                >
                    <Image
                        src={`/hero-image.png`}
                        alt="Ahmed Osman Portrait"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </div>

            <div data-layer data-speed="0.2" className="relative -mt-[5vw] md:-mt-8 lg:-mt-12">
                <h1 className="font-headline text-primary text-[15vw] md:text-[180px] lg:text-[240px] leading-none tracking-tighter">OSMAN</h1>
            </div>

            <div data-layer data-speed="0.1" className="max-w-xl text-center mt-4">
                 <p className="text-white/70 text-lg">
                    Creative Technologist, AI Innovator, and a lifelong builder of things. I turn complex problems into elegant digital experiences.
                </p>
            </div>
        </div>
    </SectionWrapper>
  );
}
