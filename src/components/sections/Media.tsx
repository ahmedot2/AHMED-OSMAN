
'use client';
import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BlurText from '../BlurText';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import StarBorder from '../StarBorder';
import { Youtube, Linkedin, Twitter, Tv } from 'lucide-react';

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.017 1.99a10 10 0 0 0-7.83 15.45c.1.1.1.2.1.3 0 .1-.1.2-.2.3l-1 2.6c-.1.3.1.5.4.5l2.6-1c.1 0 .2-.1.3-.1.1 0 .2.1.3.1a10.004 10.004 0 0 0 10.62-13.63 9.95 9.95 0 0 0-5.38-4.32Z"/><path d="M7.5 10.5c.2-.5.8-1.7 1.4-2.8.5-1 1.2-1.8 2-2.4.1-.1.2-.1.3-.1.4 0 .8.3 1 .6l.3 1c.3.8.2 1.8-1 3.1l-1.3 1.4c-.1.1-.2.3-.1.5.2.5.5 1.1 1 1.8.1.1.2.2.3.2l.3-.2c.2-.2.4-.5.5-.7.2-.5.4-1 .8-1.5.3-.4.7-.8 1.2-1 .2-.1.4 0 .6.2l1.4 1.4c.2.2.2.5.1.7-.2.5-.5 1-1 1.6-1.2 1.5-2.9 2.2-4.5 2.2a5.5 5.5 0 0 1-5.5-5.5c0-1 .2-2 .5-3Z"/></svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16.49 3.9h-4.35V15.7a3.86 3.86 0 1 1-3.86-3.86" />
      <path d="M12.14 11.83A5.7 5.7 0 0 0 16.49 7.5v4.33" />
      <path d="M16.49 3.9a5.78 5.78 0 0 1 5.78 5.78v0a5.78 5.78 0 0 1-5.78 5.78h-1.16" />
    </svg>
);


const channels = [
  {
    name: 'FINHUB',
    url: 'https://youtube.com/@ahmedosmanfinhub?si=kV3WaCFUrakM5JmK',
    image: PlaceHolderImages.find(img => img.id === 'media-finhub'),
    icon: Youtube,
    cta: 'View Channel',
  },
  {
    name: 'GlobePulse',
    url: 'https://youtube.com/@ahmedosmanglobepulse?si=iqa3QSXhqvunxe_e',
    image: PlaceHolderImages.find(img => img.id === 'media-globepulse'),
    icon: Youtube,
    cta: 'View Channel',
  },
  {
    name: 'AI Agency Agent',
    url: 'https://youtube.com/@ahmedosmanai?si=rRH76DgzvD0zGdjU',
    image: PlaceHolderImages.find(img => img.id === 'media-ai-agency'),
    icon: Youtube,
    cta: 'View Channel',
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/6AF6Eh0r8',
    image: PlaceHolderImages.find(img => img.id === 'media-pinterest'),
    icon: PinterestIcon,
    cta: 'View Profile',
  },
  {
    name: 'Personal TikTok',
    url: 'https://www.tiktok.com/@ahmedot2gmail.com?_t=zs-8wxoludbp4a&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-personal'),
    icon: TikTokIcon,
    cta: 'View Profile',
  },
  {
    name: 'Money Moves',
    url: 'https://www.tiktok.com/@ahmedosmanmoneymoves?_t=zs-8wxbfp3wnlu&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-money'),
    icon: TikTokIcon,
    cta: 'View Profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmed-osman-60914a170?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    image: PlaceHolderImages.find(img => img.id === 'media-linkedin'),
    icon: Linkedin,
    cta: 'View Profile',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/ahmedot2osman?s=21&t=AbxG907-0qN53I1vpOnOEA',
    image: PlaceHolderImages.find(img => img.id === 'media-x'),
    icon: Twitter,
    cta: 'View Profile',
  },
];

export default function Media() {
  const [titleRef, isTitleVisible, titleKey] = useScrollAnimation({ threshold: 0.5 }, false);

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      boxShadow: '0 20px 25px -5px hsl(var(--primary) / 0.2), 0 8px 10px -6px hsl(var(--primary) / 0.2)',
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }
      },
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    }
  };


  return (
    <SectionWrapper id="media" hasBackground>
      <div className="flex flex-col gap-12">
          <h2 ref={titleRef} className="font-display text-6xl md:text-[120px] font-black uppercase leading-none tracking-widest">
              <span className="text-primary block">
                {isTitleVisible ? <BlurText text="Media &" animateBy="words" key={titleKey} /> : 'Media &'}
              </span>
              <span className="text-white">Appear&shy;ances</span>
          </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
              <motion.div
                key={channel.name}
                custom={index}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
              >
                <StarBorder
                  as="a"
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="hsl(var(--primary))"
                  speed="4s"
                  className="h-full block rounded-lg overflow-hidden group"
                >
                    <div className="relative aspect-video w-full h-full flex flex-col">
                        <div className="relative w-full aspect-video flex-shrink-0">
                            {channel.image && (
                                <Image
                                    src={channel.image.imageUrl}
                                    alt={channel.name}
                                    fill
                                    data-ai-hint={channel.image.imageHint}
                                    className="object-cover w-full h-full transition-transform duration-500"
                                />
                            )}
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-100 transition-opacity duration-300">
                                <div className="flex flex-col items-center gap-2 text-white">
                                    <Icon className="w-12 h-12 text-primary" />
                                    <span className="font-bold text-lg">{channel.cta}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </StarBorder>
              </motion.div>
            )})}
        </div>
      </div>
    </SectionWrapper>
  );
}
