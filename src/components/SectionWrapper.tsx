'use client';
import { cn } from '@/lib/utils';
import React from 'react';

const SectionWrapper = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { hasBackground?: boolean }
>(({ className, children, hasBackground = false, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        'min-h-screen w-full snap-start relative flex flex-col justify-center py-24 px-6 sm:px-12 md:px-24 overflow-hidden',
        className
      )}
      {...props}
    >
      {hasBackground && (
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
      )}
      <div className="container mx-auto max-w-7xl z-10">
        {children}
      </div>
    </section>
  );
});
SectionWrapper.displayName = 'SectionWrapper';
export default SectionWrapper;
