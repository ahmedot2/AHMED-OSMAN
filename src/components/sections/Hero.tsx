
'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CurvedLoop from '../CurvedLoop';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(0.6);
  const [curveAmount, setCurveAmount] = useState(-400);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      const rotateX = yPct * -20; // Max rotation
      const rotateY = xPct * 20;  // Max rotation

      setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    const currentRef = heroRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);
    currentRef?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
      currentRef?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="hero"
      ref={heroRef}
      className="h-screen min-h-[700px] w-full snap-start relative flex flex-col justify-center items-center py-16 px-6 sm:px-12 md:px-24 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute top-8 left-0 z-30 w-full flex justify-center">
        <CurvedLoop 
          marqueeText="Rebel ✦ Entrepreneur ✦ Disruptor ✦ Designer ✦" 
          direction="right" 
          speed={speed}
          curveAmount={curveAmount}
          className="font-display uppercase text-white fill-current text-[24px]"
        />
      </div>

      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
      
      <div className="relative flex flex-col items-center justify-center">
        <div 
          className="z-10"
          style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotate.y}deg) rotateX(${rotate.x}deg)` }}
        >
          <Image
            src="/portrait.png"
            alt="Portrait of Ahmed Osman"
            width={250}
            height={250}
            data-ai-hint="portrait man"
            className="object-cover"
            style={{ transform: 'translateZ(40px)' }}
            priority
          />
        </div>

        <div className="relative w-full flex flex-col items-center justify-center z-20 -mt-24">
          <h1 className="font-display font-black uppercase text-center text-[clamp(2.5rem,18vw,10rem)] leading-[0.8] tracking-wider">
              <span className="text-white">
                AHMED
              </span>
              <span className="text-primary">
                OSMAN
              </span>
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm p-4 bg-black/50 rounded-lg backdrop-blur-sm border border-white/10">
        <div className="space-y-6">
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="speed-slider" className="text-white">Speed</Label>
              <span className="text-white/70 text-sm">{speed.toFixed(1)}</span>
            </div>
            <Slider
              id="speed-slider"
              min={0.1}
              max={5}
              step={0.1}
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="curve-slider" className="text-white">Curve Amount</Label>
               <span className="text-white/70 text-sm">{curveAmount}px</span>
            </div>
            <Slider
              id="curve-slider"
              min={-500}
              max={500}
              step={10}
              value={[curveAmount]}
              onValue-change={(value) => setCurveAmount(value[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
