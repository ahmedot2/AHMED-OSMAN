'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import './DecryptedText.css';

type DecryptedTextProps = {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
  revealDirection?: 'left' | 'right' | 'center';
};

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations: propMaxIterations,
  characters = defaultChars,
  className = '',
  parentClassName = '',
  encryptedClassName = 'decrypted-text-encrypted',
  animateOn = 'hover',
  revealDirection = 'left',
}: DecryptedTextProps) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameId = useRef<number | null>(null);
  const maxIterations = propMaxIterations ?? text.length;

  const [containerRef, isVisible] = useScrollAnimation({ threshold: 0.1 }, false);
  const hasAnimatedOnView = useRef(false);

  const scramble = useCallback(() => {
    setIsAnimating(true);
    let iteration = 0;

    const animate = () => {
      const newText = text
        .split('')
        .map((_, index) => {
          let charToReveal: number;
          switch (revealDirection) {
            case 'right':
              charToReveal = text.length - index -1;
              break;
            case 'center':
              const mid = Math.floor(text.length / 2);
              if (index < mid) {
                 charToReveal = mid - index - 1;
              } else {
                 charToReveal = index - mid;
              }
              break;
            case 'left':
            default:
              charToReveal = index;
              break;
          }

          if (charToReveal * (maxIterations / text.length) > iteration) {
            return characters[Math.floor(Math.random() * characters.length)];
          }
          return text[index];
        })
        .join('');

      setDisplayedText(newText);

      if (iteration < maxIterations) {
        iteration += 1;
        animationFrameId.current = setTimeout(() => requestAnimationFrame(animate), speed);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [text, characters, speed, maxIterations, revealDirection]);

  const reset = () => {
    if (animationFrameId.current) {
      clearTimeout(animationFrameId.current);
      animationFrameId.current = null;
    }
    setDisplayedText(text);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (animateOn === 'view' && isVisible && !isAnimating && !hasAnimatedOnView.current) {
      hasAnimatedOnView.current = true;
      scramble();
    }
  }, [isVisible, animateOn, isAnimating, scramble]);


  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !isAnimating) {
      scramble();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      reset();
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        clearTimeout(animationFrameId.current);
      }
    };
  }, []);

  const renderedText = displayedText.split('').map((char, index) => {
    const isEncrypted = text[index] !== char;
    return (
      <span key={index} className={isEncrypted ? encryptedClassName : ''}>
        {char}
      </span>
    );
  });

  return (
    <div
      ref={containerRef}
      className={`decrypted-text-parent ${parentClassName} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderedText}
    </div>
  );
};

export default DecryptedText;
