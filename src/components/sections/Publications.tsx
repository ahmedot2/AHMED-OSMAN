import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { ExternalLink, FileText } from 'lucide-react';

const publications = [
  {
    type: 'Book',
    title: 'Architecting Intelligence',
    genre: 'Software Engineering',
    synopsis: 'A comprehensive guide to designing and building scalable AI systems for the modern web.',
    image: PlaceHolderImages.find(img => img.id === 'book-1'),
    toc: ['Introduction to AI Architecture', 'Data Pipelines and ETL', 'Model Serving Patterns', 'MLOps and Automation', 'Scaling and Performance'],
    link: '#',
  },
  {
    type: 'Book',
    title: 'The Reactive Enterprise',
    genre: 'System Design',
    synopsis: 'Exploring event-driven architectures and reactive principles for building resilient applications.',
    image: PlaceHolderImages.find(img => img.id === 'book-2'),
    toc: ['Fundamentals of Reactive Systems', 'Event Sourcing and CQRS', 'Message Brokers in Depth', 'Building Resilient Microservices', 'Case Studies'],
    link: '#',
  },
  {
    type: 'Paper',
    title: 'Generative Models for UI Design',
    genre: 'HCI Research',
    synopsis: 'A novel approach using transformers to generate user interface layouts from high-level descriptions.',
    image: PlaceHolderImages.find(img => img.id === 'paper-1'),
    toc: ['Abstract', 'Introduction', 'Related Work', 'Methodology', 'Results', 'Conclusion'],
    link: '#',
  }
];

export default function Publications() {
  return (
    <SectionWrapper id="publications" hasBackground>
      <div className="flex flex-col gap-8">
        <h2 className="font-headline text-6xl md:text-7xl text-white">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub, index) => (
            <Dialog key={index}>
              <div className="bg-card/30 border border-border/10 rounded-lg overflow-hidden flex flex-col group">
                <div className="relative overflow-hidden">
                  {pub.image && (
                    <Image
                      src={pub.image.imageUrl}
                      alt={pub.title}
                      width={400}
                      height={600}
                      data-ai-hint={pub.image.imageHint}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Badge variant={pub.type === 'Book' ? 'default' : 'secondary'} className="absolute top-4 right-4">{pub.type}</Badge>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <Badge variant="outline" className="self-start mb-2 border-primary/50 text-primary">{pub.genre}</Badge>
                  <h3 className="text-3xl font-headline text-white mb-2 flex-grow">{pub.title}</h3>
                  <p className="text-white/70 mb-4 text-sm">{pub.synopsis}</p>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                </div>
              </div>

              <DialogContent className="sm:max-w-[625px] bg-gray-900 border-border/50 text-white">
                <DialogHeader>
                  <DialogTitle className="font-headline text-3xl text-primary">{pub.title}</DialogTitle>
                  <DialogDescription className="text-white/70 pt-2">
                    {pub.synopsis}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <h4 className="font-bold text-lg text-white">Table of Contents</h4>
                  <ul className="space-y-2 text-white/80">
                    {pub.toc.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary/70 shrink-0" />
                        <span>{item}</span>
                      </li>
))}
                  </ul>
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" asChild>
                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                      Download PDF <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                   <Button asChild>
                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                      Buy Now <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
