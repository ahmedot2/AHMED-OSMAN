'use client';

import { useState, useEffect, useRef } from 'react';

type UseScrollAnimationReturn = [
  React.RefObject<HTMLDivElement>,
  boolean,
  string // key for re-triggering animations
];

export const useScrollAnimation = (
  options?: IntersectionObserverInit,
  triggerOnce: boolean = true
): UseScrollAnimationReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(String(Math.random()));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isVisible) {
            setIsVisible(true);
            setKey(String(Math.random()));
        }
        if (triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else {
        if (isVisible && !triggerOnce) {
          setIsVisible(false);
        }
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
  }, [options, triggerOnce, isVisible]);

  return [containerRef, isVisible, key];
};
