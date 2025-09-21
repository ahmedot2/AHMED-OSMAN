'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const portraitImage = PlaceHolderImages.find(img => img.id === 'cv-preview');

  return (
    <div className="relative w-full h-full flex items-center justify-center text-center p-4 sm:p-8">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="text-red-600 font-display font-black uppercase text-[clamp(8rem,30vw,25rem)] leading-none tracking-tighter" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)'}}>
          Work For You
        </div>
      </div>

      <div className="z-10 grid grid-cols-3 gap-8 items-center max-w-7xl mx-auto w-full">
        {/* Left Column */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold font-headline">Rebel</h2>
          <h2 className="text-3xl md:text-5xl font-bold font-headline">Entrepreneur</h2>
          <h2 className="text-3xl md:text-5xl font-bold font-headline">Disruptor</h2>
          <h2 className="text-3xl md:text-5xl font-bold font-headline">Designer</h2>
        </div>

        {/* Center Column (Image) */}
        <div className="relative flex justify-center items-center">
            {portraitImage && (
                <Image
                    src={portraitImage.imageUrl}
                    alt="Portrait of Ahmed Osman"
                    width={400}
                    height={600}
                    data-ai-hint={portraitImage.imageHint}
                    className="object-contain grayscale"
                    priority
                />
            )}
        </div>

        {/* Right Column */}
        <div className="text-left">
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            My passion is creating meaningful products for the world that solves real problems, delights users and exceeds expectations.
          </p>
        </div>
      </div>
    </div>
  );
}
