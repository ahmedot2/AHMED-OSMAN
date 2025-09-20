import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import SectionWrapper from '../SectionWrapper';

export default function Footer() {
  return (
    <SectionWrapper id="footer" className="bg-gradient-to-t from-gray-900/50 to-black justify-center items-center text-center">
        <div className="flex flex-col items-center gap-6">
            <h2 className="font-headline text-4xl md:text-5xl text-white">Get The Full Story</h2>
            <p className="max-w-xl text-white/70">
                For a detailed overview of my professional journey, skills, and accomplishments, download the complete curriculum vitae.
            </p>
            <Button size="lg" asChild>
                <a href="/ahmed-osman-cv.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download Full CV
                </a>
            </Button>
        </div>
        <div className="absolute bottom-8 text-center w-full text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} Ahmed Osman. All Rights Reserved.</p>
        </div>
    </SectionWrapper>
  );
}
