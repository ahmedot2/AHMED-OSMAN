'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type TextTypeProps = {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
  highlightedWords?: { [word: string]: string };
};

const TextType = ({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = '|',
  className = '',
  highlightedWords = {},
}: TextTypeProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [containerRef, isVisible] = useScrollAnimation({ threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!text || text.length === 0 || !isVisible || hasAnimated.current) return;

    hasAnimated.current = true;

    const handleTyping = () => {
      const currentString = text[currentTextIndex];
      
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayText(currentString.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % text.length);
        }
      } else {
        if (charIndex < currentString.length) {
          setDisplayText(currentString.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, currentTextIndex, text, typingSpeed, pauseDuration, isVisible]);

  const renderedText = useMemo(() => {
    let tempText = displayText;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    const sortedWords = Object.keys(highlightedWords).sort((a, b) => b.length - a.length);

    while(lastIndex < tempText.length) {
        let found = false;
        for (const word of sortedWords) {
            const index = tempText.indexOf(word, lastIndex);
            if (index !== -1) {
                if (index > lastIndex) {
                    parts.push(tempText.substring(lastIndex, index));
                }
                parts.push(<span key={index} className={highlightedWords[word]}>{word}</span>);
                lastIndex = index + word.length;
                found = true;
                break;
            }
        }
        if (!found) {
            parts.push(tempText.substring(lastIndex));
            break;
        }
    }


    const combinedParts = parts.reduce((acc, part, index) => {
        if (typeof part === 'string' && acc.length > 0 && typeof acc[acc.length-1] === 'string') {
            acc[acc.length-1] += part;
        } else {
            acc.push(part);
        }
        return acc;
    }, [] as (string | JSX.Element)[]);


    return <>{combinedParts}</>;

  }, [displayText, highlightedWords]);

  return (
    <p ref={containerRef} className={className}>
      {renderedText}
      {showCursor && <span className="animate-pulse">{cursorCharacter}</span>}
    </p>
  );
};

export default TextType;
