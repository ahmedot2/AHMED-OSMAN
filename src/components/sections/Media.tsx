'use client';
import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CirclePlay, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const channels = [
  {
    name: 'FINHUB',
    url: 'https://youtube.com/@ahmedosmanfinhub?si=kV3WaCFUrakM5JmK',
    image: PlaceHolderImages.find(img => img.id === 'media-finhub-channel'),
  },
  {
    name: 'GlobePulse',
    url: 'https://youtube.com/@ahmedosmanglobepulse?si=iqa3QSXhqvunxe_e',
    image: PlaceHolderImages.find(img => img.id === 'media-globepulse-channel'),
  },
  {
    name: 'AI Agency Agent',
    url: 'https://youtube.com/@ahmedosmanai?si=rRH76DgzvD0zGdjU',
    image: PlaceHolderImages.find(img => img.id === 'media-ai-agency-channel'),
  },
];

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
      <div className="flex flex-col gap-12">
          <h2 className="font-display text-6xl md:text-[120px] font-black uppercase leading-none tracking-widest">
              <span className="text-primary block">Media &</span>
              <span className="text-white">Appear&shy;ances</span>
          </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {channels.map((channel, index) => (
                <motion.a 
                    key={channel.name} 
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={index}
                    variants={cardVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.2 }}
                    className="block"
                    >
                    <Card className="bg-card/50 group overflow-hidden h-full flex flex-col rounded-lg">
                        <CardContent className="relative flex aspect-video items-center justify-center p-0">
                            {channel.image && (
                                <Image
                                src={channel.image.imageUrl}
                                alt={channel.name}
                                fill
                                data-ai-hint={channel.image.imageHint}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <CirclePlay className="w-20 h-20 text-primary" />
                            </div>
                             <div className="absolute bottom-4 left-6 z-10">
                                <h3 className="text-3xl font-headline text-white">{channel.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Youtube className="w-5 h-5 text-red-600 animate-pulse-red"/>
                                    <span className="text-sm font-medium text-white/80">Visit channel</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.a>
            ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
