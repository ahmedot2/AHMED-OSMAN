'use client';
import { useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Eye, Users, ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const techTalks = [
  {
    title: 'AI in 2024',
    image: PlaceHolderImages.find(img => img.id === 'youtube-1'),
  },
  {
    title: 'The Future of Web Dev',
    image: PlaceHolderImages.find(img => img.id === 'project-3'),
  },
  {
    title: 'Quantum Computing Explained',
    image: PlaceHolderImages.find(img => img.id === 'youtube-2'),
  },
  {
    title: 'Blockchain Beyond Bitcoin',
    image: PlaceHolderImages.find(img => img.id === 'project-2'),
  }
];

const codeStreams = [
    {
        title: 'Building a Next.js App from Scratch',
        image: PlaceHolderImages.find(img => img.id === 'project-1')
    },
    {
        title: 'Python for AI/ML',
        image: PlaceHolderImages.find(img => img.id === 'project-4')
    },
];

const VideoCarousel = ({ videos }: { videos: typeof techTalks }) => (
  <Carousel
    opts={{
      align: 'start',
      loop: true,
    }}
    className="w-full"
  >
    <CarouselContent>
      {videos.map((video, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
          <a href="#" className="block group">
            <Card className="overflow-hidden bg-card/30 border-border/10">
              <CardContent className="relative aspect-video p-0">
                {video.image && (
                  <Image
                    src={video.image.imageUrl}
                    alt={video.title}
                    fill
                    data-ai-hint={video.image.imageHint}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="w-20 h-20 text-primary" />
                </div>
                <h3 className="absolute bottom-4 left-4 text-white font-headline text-xl">
                  {video.title}
                </h3>
              </CardContent>
            </Card>
          </a>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="hidden md:flex" />
    <CarouselNext className="hidden md:flex" />
  </Carousel>
);

export default function Media() {
  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
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
    <SectionWrapper id="media" hasBackground>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="font-display text-6xl md:text-[120px] font-black uppercase leading-none tracking-widest">
                <span className="text-primary block">Media &</span>
                <span className="text-white">Appear&shy;ances</span>
            </h2>
        </div>
        
        <Tabs defaultValue="tech-talks" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <TabsList className="grid grid-cols-2 w-full md:w-auto bg-white/5 border-border/20">
                    <TabsTrigger value="tech-talks">Tech Talks</TabsTrigger>
                    <TabsTrigger value="code-streams">Code Streams</TabsTrigger>
                </TabsList>
                 <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary"/>
                        <span className="font-bold">1.2M</span>
                        <span>Subscribers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary"/>
                        <span className="font-bold">150M</span>
                        <span>Total Views</span>
                    </div>
                    <Button asChild className="hidden md:flex">
                        <a href="https://youtube.com/@ahmedosmanfinhub?si=kV3WaCFUrakM5JmK" target='_blank' rel='noopener noreferrer'>
                            Visit Channel <ArrowRight className="ml-2"/>
                        </a>
                    </Button>
                </div>
            </div>
            
          <TabsContent value="tech-talks">
            <VideoCarousel videos={techTalks} />
          </TabsContent>
          <TabsContent value="code-streams">
            <VideoCarousel videos={codeStreams} />
          </TabsContent>
        </Tabs>
      </div>
    </SectionWrapper>
  );
}
