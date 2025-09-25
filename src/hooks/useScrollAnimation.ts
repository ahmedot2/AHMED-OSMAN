'use client';

import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (
  options?: IntersectionObserverInit,
  triggerOnce = true
): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (triggerOnce) {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      } else {
        setIsVisible(entry.isIntersecting);
      }
    }, options);

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options, triggerOnce]);

  return [containerRef, isVisible];
};
