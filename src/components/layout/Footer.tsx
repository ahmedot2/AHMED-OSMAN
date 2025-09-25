'use client';
import InteractiveImage from '../InteractiveImage';
import SectionWrapper from '../SectionWrapper';

export default function Footer() {
  const quote = "Code the chaos, author the ascent—futures shaped by intuition's flame.";
  
  const renderQuote = () => {
    const highlighted = ['chaos', 'ascent', 'flame'];
    const parts = quote.split(/(\s+)/).map((part, index) => {
      // Find a word that starts with one of the highlighted words
      const highlightMatch = highlighted.find(h => part.toLowerCase().startsWith(h));
      if (highlightMatch) {
        // Separate the word from punctuation
        const wordMatch = part.match(new RegExp(`^(${highlightMatch})`, 'i'));
        if (wordMatch) {
            const word = wordMatch[0];
            const rest = part.substring(word.length);
            return (
                <span key={index}>
                    <span className="text-primary">{word}</span>{rest}
                </span>
            );
        }
      }
      return <span key={index}>{part}</span>;
    });

    return <p className="font-headline text-4xl lg:text-5xl text-white leading-tight">{parts}</p>;
  };

  return (
    <SectionWrapper
      id="footer"
      className="bg-gradient-to-t from-gray-900/50 to-black justify-center items-center text-center py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="text-left">
          {renderQuote()}
        </div>
        <div className="w-full max-w-sm mx-auto">
          <InteractiveImage
            src="/footer-image.png"
            alt="Abstract representation of chaos and ascent"
            width={600}
            height={400}
            data-ai-hint="abstract flame"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="text-center w-full text-sm text-white/40 border-t border-white/10 pt-8">
        <p>&copy; {new Date().getFullYear()} Ahmed Osman. All Rights Reserved.</p>
      </div>
    </SectionWrapper>
  );
}
