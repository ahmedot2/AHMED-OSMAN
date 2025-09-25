
'use client';
import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BlurText from '../BlurText';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import StarBorder from '../StarBorder';
import { Tv } from 'lucide-react';

const channels = [
  {
    name: 'FINHUB',
    url: 'https://youtube.com/@ahmedosmanfinhub?si=kV3WaCFUrakM5JmK',
    image: PlaceHolderImages.find(img => img.id === 'media-finhub'),
    icon: Tv
  },
  {
    name: 'GlobePulse',
    url: 'https://youtube.com/@ahmedosmanglobepulse?si=iqa3QSXhqvunxe_e',
    image: PlaceHolderImages.find(img => img.id === 'media-globepulse'),
    icon: Tv
  },
  {
    name: 'AI Agency Agent',
    url: 'https://youtube.com/@ahmedosmanai?si=rRH76DgzvD0zGdjU',
    image: PlaceHolderImages.find(img => img.id === 'media-ai-agency'),
    icon: Tv
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/6AF6Eh0r8',
    image: PlaceHolderImages.find(img => img.id === 'media-pinterest'),
    icon: Tv
  },
  {
    name: 'Personal TikTok',
    url: 'https://www.tiktok.com/@ahmedot2gmail.com?_t=zs-8wxoludbp4a&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-personal'),
    icon: Tv
  },
  {
    name: 'Money Moves',
    url: 'https://www.tiktok.com/@ahmedosmanmoneymoves?_t=zs-8wxbfp3wnlu&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-money'),
    icon: Tv
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmed-osman-60914a170?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    image: PlaceHolderImages.find(img => img.id === 'media-linkedin'),
    icon: Tv
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/ahmedot2osman?s=21&t=AbxG907-0qN53I1vpOnOEA',
    image: PlaceHolderImages.find(img => img.id === 'media-x'),
    icon: Tv
  },
];

export default function Media() {
  const [titleRef, isTitleVisible, titleKey] = useScrollAnimation({ threshold: 0.5 }, false);

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
    <SectionWrapper id="media" hasBackground>
      <div className="flex flex-col gap-12">
          <h2 ref={titleRef} className="font-display text-6xl md:text-[120px] font-black uppercase leading-none tracking-widest">
              <span className="text-primary block">
                {isTitleVisible ? <BlurText text="Media &" animateBy="words" key={titleKey} /> : 'Media &'}
              </span>
              <span className="text-white">Appear&shy;ances</span>
          </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.name}
                custom={index}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
                className="h-full block group"
              >
                <StarBorder
                  as="a"
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="hsl(var(--primary))"
                  speed="4s"
                  className="h-full block rounded-lg overflow-hidden"
                >
                    <div className="relative aspect-video w-full h-full flex flex-col">
                        <div className="relative w-full aspect-video flex-shrink-0">
                            {channel.image && (
                                <Image
                                    src={channel.image.imageUrl}
                                    alt={channel.name}
                                    fill
                                    data-ai-hint={channel.image.imageHint}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                            )}
                        </div>
                    </div>
                </StarBorder>
              </motion.div>
            ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
