'use client';
import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CirclePlay, Youtube, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 4.885 3.433 9.043 8.047 10.513.047-.323.081-.692.112-1.026.04-.42.261-1.235.261-1.235s-.07-.139-.07-.345c0-.82.479-1.428 1.077-1.428.506 0 .75.38.75.836 0 .507-.321 1.26-.486 1.953-.139.584.295 1.06.877 1.06 1.05 0 1.853-1.11 1.853-2.715 0-1.42-.823-2.456-1.99-2.456-1.373 0-2.164 1.02-.2164 2.247.2.49.317.65.317.973 0 .39-.187.734-.4 1.01-.13.167-.28.322-.28.528 0 .22.18.44.516.44 1.13 0 1.94-1.5 1.94-3.667 0-1.928-1.38-3.32-3.15-3.32-2.13 0-3.48 1.583-3.48 3.195 0 .68.21 1.41.51 1.8.06.08.07.15.05.25-.06.27-.187.75-.22.89-.04.18-.13.22-.3.12-1.1-.6-1.78-2.1-1.78-3.4 0-2.6 1.9-4.8 5.2-4.8 2.7 0 4.7 1.9 4.7 4.3 0 2.7-1.5 4.8-3.6 4.8-.7 0-1.4-.4-1.6-.8 0 0-.3.9-.4 1.2-.1.3-.3.6-.5.8C10.7 21.6 11.3 22 12 22c6.6 0 12-5.4 12-12S18.6 0 12 0z"/>
    </svg>
  );

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.65 4.32 1.71v3.91c-1.61.06-3.19.5-4.32 1.62-1.14 1.11-1.67 2.7-1.73 4.31H12.5c.06-1.61.5-3.2 1.62-4.33 1.11-1.12 2.7-1.66 4.31-1.72v-3.9c-1.61-.06-3.2-.5-4.32-1.62C13.02 3.2 12.58 1.6.525.02zM7.02 4.14c.03 1.37.58 2.74 1.68 3.82 1.1 1.08 2.5 1.62 3.92 1.66v3.89c-1.4.04-2.8.58-3.92 1.66-1.1 1.08-1.65 2.45-1.68 3.82H2.96c.03-2.3.9-4.55 2.56-6.2C7.18 7.07 9.42 6.2 11.72 6.2V2.3c-2.3-.02-4.55.85-6.2 2.52C3.86 6.47 3 8.71 2.96 11.02V4.14h4.06z"/>
    </svg>
  );

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);


const channels = [
  {
    name: 'FINHUB',
    url: 'https://youtube.com/@ahmedosmanfinhub?si=kV3WaCFUrakM5JmK',
    image: PlaceHolderImages.find(img => img.id === 'media-finhub'),
    icon: Youtube
  },
  {
    name: 'GlobePulse',
    url: 'https://youtube.com/@ahmedosmanglobepulse?si=iqa3QSXhqvunxe_e',
    image: PlaceHolderImages.find(img => img.id === 'media-globepulse'),
    icon: Youtube
  },
  {
    name: 'AI Agency Agent',
    url: 'https://youtube.com/@ahmedosmanai?si=rRH76DgzvD0zGdjU',
    image: PlaceHolderImages.find(img => img.id === 'media-ai-agency'),
    icon: Youtube
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/6AF6Eh0r8',
    image: PlaceHolderImages.find(img => img.id === 'media-pinterest'),
    icon: PinterestIcon
  },
  {
    name: 'Personal TikTok',
    url: 'https://www.tiktok.com/@ahmedot2gmail.com?_t=zs-8wxoludbp4a&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-personal'),
    icon: TikTokIcon
  },
  {
    name: 'Money Moves',
    url: 'https://www.tiktok.com/@ahmedosmanmoneymoves?_t=zs-8wxbfp3wnlu&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-money'),
    icon: TikTokIcon
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmed-osman-60914a170?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    image: PlaceHolderImages.find(img => img.id === 'media-linkedin'),
    icon: Linkedin
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/ahmedot2osman?s=21&t=AbxG907-0qN53I1vpOnOEA',
    image: PlaceHolderImages.find(img => img.id === 'media-x'),
    icon: XIcon
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
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
                        <Card className="bg-card/50 group overflow-hidden rounded-lg">
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
                                    <div className="flex items-center gap-2 mt-1">
                                        <Icon className={cn("w-5 h-5", 
                                            channel.icon === Youtube ? "text-red-600 animate-pulse-red" : "text-white",
                                            channel.icon === Linkedin && "text-[#0077B5]"
                                        )} />
                                        <span className="text-sm font-medium text-white/80">
                                            {channel.icon === Youtube ? 'Visit channel' : 'Visit profile'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.a>
                )
            })}
        </div>
      </div>
    </SectionWrapper>
  );
}
