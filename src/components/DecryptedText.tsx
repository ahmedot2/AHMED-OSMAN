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
  highlightedWords?: { [word: string]: string };
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
  highlightedWords = {},
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
              charToReveal = text.length - index - 1;
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
    if (animateOn === 'view' && isVisible && !isAnimating) {
      if (triggerOnce) {
        if (!hasAnimatedOnView.current) {
          hasAnimatedOnView.current = true;
          scramble();
        }
      } else {
        scramble();
      }
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

  const triggerOnce = animateOn === 'view';

  const renderHighlightedText = (currentText: string) => {
    if (!Object.keys(highlightedWords).length) {
      return currentText.split('').map((char, index) => {
        const isEncrypted = text[index] !== char;
        return (
          <span key={index} className={isEncrypted ? encryptedClassName : ''}>
            {char}
          </span>
        );
      });
    }
  
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
  
    while (lastIndex < text.length) {
      let foundWord = null;
      let foundIndex = -1;
  
      Object.keys(highlightedWords).forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        const match = text.substring(lastIndex).match(regex);
        if (match && (foundIndex === -1 || lastIndex + (match.index || 0) < foundIndex)) {
          foundWord = word;
          foundIndex = lastIndex + (match.index || 0);
        }
      });
  
      if (foundWord) {
        if (foundIndex > lastIndex) {
          parts.push(text.substring(lastIndex, foundIndex));
        }
        parts.push(
          <span key={foundIndex} className={highlightedWords[foundWord]}>
            {text.substring(foundIndex, foundIndex + foundWord.length)}
          </span>
        );
        lastIndex = foundIndex + foundWord.length;
      } else {
        parts.push(text.substring(lastIndex));
        break;
      }
    }
  
    return parts.map((part, partIndex) => {
      if (typeof part === 'string') {
        const partStartIndex = text.indexOf(part, partIndex > 0 ? text.indexOf(parts[partIndex - 1]?.props?.children) + parts[partIndex-1].props.children.length : 0 );
        return part.split('').map((char, charIndex) => {
          const originalIndex = partStartIndex + charIndex;
          const isEncrypted = displayedText[originalIndex] !== char;
          return (
            <span key={`${partIndex}-${charIndex}`} className={isEncrypted ? encryptedClassName : ''}>
              {isEncrypted ? displayedText[originalIndex] : char}
            </span>
          );
        });
      }
      // This is a highlighted word
      const childrenString = part.props.children;
      const partStartIndex = text.indexOf(childrenString);
      return (
        <span key={partIndex} className={part.props.className}>
          {childrenString.split('').map((char: string, charIndex: number) => {
            const originalIndex = partStartIndex + charIndex;
            const isEncrypted = displayedText[originalIndex] !== char;
            return (
              <span key={`${partIndex}-${charIndex}`} className={isEncrypted ? encryptedClassName : ''}>
                {isEncrypted ? displayedText[originalIndex] : char}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`decrypted-text-parent ${parentClassName} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderHighlightedText(displayedText)}
    </div>
  );
};

export default DecryptedText;
