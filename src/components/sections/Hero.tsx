'use client';

export default function Hero() {

  return (
    <div
      id="hero"
      className="h-screen min-h-[700px] w-full snap-start relative flex flex-col justify-center py-16 px-6 sm:px-12 md:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
      <div className="container mx-auto max-w-7xl z-10 flex flex-col items-center justify-center w-full">
        <svg viewBox="0 0 1200 200" className="w-full h-auto">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-display font-black uppercase tracking-wider" fontSize="180">
                <tspan fill="white">AHMED</tspan>
                <tspan fill="hsl(var(--primary))">OSMAN</tspan>
            </text>
        </svg>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mt-4 text-center">
          Creative Technologist, AI Innovator, and Product Leader dedicated to building the future.
        </p>
      </div>
    </div>
  );
}
