'use client';

import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (
  options?: IntersectionObserverInit,
  triggerOnce = true
): [React.RefObject<HTMLDivElement>, boolean, number] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (triggerOnce) {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationKey(prev => prev + 1);
          observer.unobserve(entry.target);
        }
      } else {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
            setAnimationKey(prev => prev + 1);
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
  }, [options, triggerOnce]);

  return [containerRef, isVisible, animationKey];
};
