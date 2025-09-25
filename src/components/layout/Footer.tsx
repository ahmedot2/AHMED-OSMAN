import InteractiveImage from '../InteractiveImage';
import SectionWrapper from '../SectionWrapper';

export default function Footer() {
  return (
    <SectionWrapper
      id="footer"
      className="bg-gradient-to-t from-gray-900/50 to-black justify-center items-center text-center py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="text-left">
          <p className="font-headline text-4xl lg:text-5xl text-white leading-tight">
            “Code the <span className="text-primary">chaos</span>, author the{' '}
            <span className="text-primary">ascent</span>—futures shaped by
            intuition's <span className="text-primary">flame</span>.”
          </p>
        </div>
        <div className="w-full max-w-sm mx-auto">
          <InteractiveImage
            src="https://picsum.photos/seed/footer/600/400"
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
