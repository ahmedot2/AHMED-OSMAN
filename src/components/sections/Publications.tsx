
'use client';
import { useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { ExternalLink, Download, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import StarBorder from '../StarBorder';
import BlurText from '../BlurText';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const publications = [
  {
    type: 'Fiction',
    title: 'Flying Death',
    genre: 'Thriller',
    pages: 184,
    synopsis: 'High above the clouds, his charm hides a chilling secret. Every layover is his playground. Every city, another victim.',
    image: PlaceHolderImages.find(img => img.id === 'flying-death'),
    links: {
      apple: 'https://books.apple.com/us/book/flying-death/id674105232',
      google: 'https://play.google.com/store/books/details?id=8r06EQAAQBAJ',
      pdf: '/books/flying-death.pdf',
      epub: '/books/flying-death.epub',
    },
  },
  {
    type: 'Fiction',
    title: 'Law of Mother Russia',
    genre: 'Spy/Thriller',
    pages: 190,
    synopsis: 'In a world where shadows conceal secrets and loyalties waver like a candle\'s flame, one agent stands against the tide.',
    image: PlaceHolderImages.find(img => img.id === 'law-of-mother-russia'),
    links: {
      apple: 'https://books.apple.com/us/book/law-of-mother-russia/id6741052687',
      google: 'https://play.google.com/store/books/details?id=ZndBEQAAQBAJ',
      pdf: '/books/law-of-mother-russia.pdf',
      epub: '/books/law-of-mother-russia.epub',
    },
  },
  {
    type: 'Fiction',
    title: 'Prague Christmas Affair',
    genre: 'Mystery/Romance',
    pages: 188,
    synopsis: 'In the heart of a winter-clad Prague, a chance encounter unravels a mystery where snow hides more than just footprints.',
    image: PlaceHolderImages.find(img => img.id === 'prague-christmas-affair'),
    links: {
      apple: 'https://books.apple.com/us/book/prague-christmas-affair/id6741052664',
      google: 'https://play.google.com/store/books/details?id=jr06EQAAQBAJ',
      pdf: '/books/prague-christmas-affair.pdf',
      epub: '/books/prague-christmas-affair.epub',
    },
  },
  {
    type: 'Non-Fiction',
    title: 'The Subtle Art of Giving a F*ck',
    genre: 'Biography/Non-Fiction',
    pages: 396,
    synopsis: 'Elon Musk\'s life is the ultimate guide to living boldly—unpacking principles from relentless focus to world-changing innovation.',
    image: PlaceHolderImages.find(img => img.id === 'subtle-art'),
    links: {
      apple: 'https://books.apple.com/us/book/the-subtle-art-of-giving-a-f-ck/id6740659959',
      google: 'https://play.google.com/store/books/details?id=AfM9EQAAQBAJ',
      pdf: '/books/subtle-art.pdf',
      epub: '/books/subtle-art.epub',
    },
  },
  {
    type: 'Fiction',
    title: 'The Favela Pact',
    genre: 'Drama/Survival',
    pages: 270,
    synopsis: 'An electrifying tale thrusting readers into Rio\'s pulse-pounding heart, where survival becomes the only currency that matters.',
    image: PlaceHolderImages.find(img => img.id === 'favela-pact'),
    links: {
      apple: 'https://books.apple.com/us/book/the-favela-pact/id6741052868',
      google: 'https://play.google.com/store/books/details?id=nL06EQAAQBAJ',
      pdf: '/books/favela-pact.pdf',
      epub: '/books/favela-pact.epub',
    },
  },
  {
    type: 'Fiction',
    title: 'The Haunting of Flight 201',
    genre: 'Horror',
    pages: 138,
    synopsis: 'At 30,000 feet, the past refuses to stay buried. A routine flight descends into a nightmare as a vengeful spirit seeks justice.',
    image: PlaceHolderImages.find(img => img.id === 'haunting-flight-201'),
    links: {
      apple: 'https://books.apple.com/us/book/the-haunting-of-flight-201/id6741052982',
      google: 'https://play.google.com/store/books/details?id=8r06EQAAQBAJ',
      pdf: '/books/haunting-flight-201.pdf',
      epub: '/books/haunting-flight-201.epub',
    },
  },
  {
    type: 'Papers',
    title: 'UN Strategic Perspectives',
    genre: 'Policy Papers',
    pages: 0,
    synopsis: 'Curated strategic studies on global solutions: operational effectiveness, disaster resilience, child protection, and more.',
    image: PlaceHolderImages.find(img => img.id === 'un-papers'),
    papers: [
        { title: 'UN Peacekeeping Efficiency Framework', url: '/books/un/un-paper-1.pdf', downloadName: 'UN Peacekeeping Efficiency Framework.pdf' },
        { title: 'DOS Client Experience Roadmap', url: '/books/un/un-paper-2.pdf', downloadName: 'DOS Client Experience Roadmap.pdf' },
        { title: 'Arab States DRR Resilience Plan', url: '/books/un/un-paper-3.pdf', downloadName: 'Arab States DRR Resilience Plan.pdf' },
        { title: 'UN Programme Planning Strategies', url: '/books/un/un-paper-4.pdf', downloadName: 'UN Programme Planning Strategies.pdf' },
        { title: 'Sustainable Trade in Developing Economies', url: '/books/un/un-paper-5.pdf', downloadName: 'Sustainable Trade in Developing Economies.pdf' },
        { title: 'Internal Displacement Solutions Guide', url: '/books/un/un-paper-6.pdf', downloadName: 'Internal Displacement Solutions Guide.pdf' },
        { title: 'Children in Conflict Protection Tactics', url: '/books/un/un-paper-7.pdf', downloadName: 'Children in Conflict Protection Tactics.pdf' },
        { title: 'UNJSPF Governance & Services Blueprint', url: '/books/un/un-paper-8.pdf', downloadName: 'UNJSPF Governance & Services Blueprint.pdf' },
    ]
  },
];

const filters = ['All', 'Fiction', 'Non-Fiction', 'Papers'];

export default function Publications() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.5 }, false);

  const filteredPublications = publications.filter(p => {
    if (activeFilter === 'All') return true;
    return p.type === activeFilter;
  });

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -8,
      boxShadow: '0 20px 25px -5px hsl(var(--primary) / 0.2), 0 8px 10px -6px hsl(var(--primary) / 0.2)',
      transition: { duration: 0.3 },
    }
  };

  return (
    <SectionWrapper id="publications" hasBackground>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
           <h2 ref={titleRef} className="font-display text-8xl md:text-[120px] font-black uppercase leading-none tracking-widest">
            {isTitleVisible && (
              <span className="text-primary block">
                  <BlurText text="Publi" animateBy="chars" key={String(isTitleVisible)} />
              </span>
            )}
            <span className="text-white block md:inline">
                cations
            </span>
          </h2>
          <Tabs defaultValue={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto bg-white/5 border-border/20">
              {filters.map(filter => (
                <TabsTrigger key={filter} value={filter} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  {filter}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((pub, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  className="h-full"
                >
                  <StarBorder
                    as="div"
                    color="hsl(var(--primary))"
                    speed="4s"
                    className="h-full"
                  >
                    <div className="flex flex-col group cursor-pointer h-full">
                      <div className="relative overflow-hidden aspect-[3/4]">
                        {pub.image && (
                          <Image
                            src={pub.image.imageUrl}
                            alt={pub.title}
                            fill
                            data-ai-hint={pub.image.imageHint}
                            className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow bg-background">
                        <Badge variant="outline" className="self-start mb-3 border-primary/50 text-primary">{pub.genre}</Badge>
                        <h3 className="text-2xl font-headline text-white mb-2 flex-grow">{pub.title}</h3>
                        <div className="flex items-center text-xs text-primary/80 mt-auto animate-pulse text-primary">
                            <BookOpen className="w-4 h-4 mr-2"/>
                            <span>Click to see details & download options</span>
                        </div>
                      </div>
                    </div>
                  </StarBorder>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-3xl bg-gray-950/90 border-border/50 text-white backdrop-blur-lg">
                <DialogHeader className="pr-8">
                    <div className='flex gap-2 items-center mb-2'>
                        <Badge variant={pub.type === 'Papers' ? 'secondary' : 'default'} >{pub.type === 'Papers' ? 'Papers' : 'Book'}</Badge>
                        <Badge variant="outline" className="border-primary/50 text-primary">{pub.genre}</Badge>
                    </div>
                  <DialogTitle className="font-headline text-4xl text-primary">{pub.title}</DialogTitle>
                  <DialogDescription className="text-white/70 pt-2 text-base">
                    {pub.synopsis}
                  </DialogDescription>
                </DialogHeader>

                {pub.type === 'Papers' && pub.papers ? (
                   <div className="py-4">
                     <h4 className="font-bold text-xl text-white mb-4">Download Individual Papers</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {pub.papers.map((paper, paperIndex) => (
                         <Button key={paperIndex} variant="outline" asChild>
                           <a href={paper.url} target="_blank" rel="noopener noreferrer" download={paper.downloadName}>
                             <Download className="mr-2 h-4 w-4" /> {paper.title}
                           </a>
                         </Button>
                       ))}
                     </div>
                   </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8 py-4">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border/20">
                      {pub.image && (
                          <Image
                              src={pub.image.imageUrl}
                              alt={pub.title}
                              fill
                              data-ai-hint={pub.image.imageHint}
                              className="object-cover w-full h-full"
                          />
                      )}
                    </div>
                    <div className="flex flex-col gap-4 justify-center">
                      <h4 className="font-bold text-xl text-white">Purchase or Download</h4>
                      <p className="text-sm text-white/60">
                        Access this publication through your preferred platform or download a digital copy directly.
                      </p>
                      {pub.links && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pub.links.apple && pub.links.apple !== '#' && (
                            <Button asChild>
                              <a href={pub.links.apple} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" /> Apple Books
                              </a>
                            </Button>
                          )}
                          {pub.links.google && pub.links.google !== '#' && (
                            <Button asChild>
                              <a href={pub.links.google} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" /> Google Books
                              </a>
                            </Button>
                          )}
                          {pub.links.pdf && pub.links.pdf !== '#' && (
                            <Button variant="outline" asChild>
                              <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" download>
                                <Download className="mr-2 h-4 w-4" /> Download PDF
                              </a>
                            </Button>
                          )}
                          {pub.links.epub && pub.links.epub !== '#' && (
                            <Button variant="outline" asChild>
                              <a href={pub.links.epub} target="_blank" rel="noopener noreferrer" download>
                                <Download className="mr-2 h-4 w-4" /> Download EPUB
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
