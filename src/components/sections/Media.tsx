
'use client';
import SectionWrapper from '../SectionWrapper';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BlurText from '../BlurText';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import StarBorder from '../StarBorder';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';

const channels = [
  {
    name: 'FINHUB',
    url: 'https://youtube.com/@ahmedosmanfinhub?si=kV3WaCFUrakM5JmK',
    image: PlaceHolderImages.find(img => img.id === 'media-finhub'),
    cta: 'View Channel',
  },
  {
    name: 'GlobePulse',
    url: 'https://youtube.com/@ahmedosmanglobepulse?si=iqa3QSXhqvunxe_e',
    image: PlaceHolderImages.find(img => img.id === 'media-globepulse'),
    cta: 'View Channel',
  },
  {
    name: 'AI Agency Agent',
    url: 'https://youtube.com/@ahmedosmanai?si=rRH76DgzvD0zGdjU',
    image: PlaceHolderImages.find(img => img.id === 'media-ai-agency'),
    cta: 'View Channel',
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/6AF6Eh0r8',
    image: PlaceHolderImages.find(img => img.id === 'media-pinterest'),
    cta: 'View Profile',
  },
  {
    name: 'Personal TikTok',
    url: 'https://www.tiktok.com/@ahmedot2gmail.com?_t=zs-8wxoludbp4a&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-personal'),
    cta: 'View Profile',
  },
  {
    name: 'Money Moves',
    url: 'https://www.tiktok.com/@ahmedosmanmoneymoves?_t=zs-8wxbfp3wnlu&_r=1',
    image: PlaceHolderImages.find(img => img.id === 'media-tiktok-money'),
    cta: 'View Profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmed-osman-60914a170?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    image: PlaceHolderImages.find(img => img.id === 'media-linkedin'),
    cta: 'View Profile',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/ahmedot2osman?s=21&t=AbxG907-0qN53I1vpOnOEA',
    image: PlaceHolderImages.find(img => img.id === 'media-x'),
    cta: 'View Profile',
  },
  {
    name: 'Apple Podcast',
    type: 'podcast-apple',
    image: PlaceHolderImages.find(img => img.id === 'media-apple-podcast'),
    cta: 'Listen on Apple',
    embed: '<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/us/podcast/ai-money-travel/id1844080936"></iframe>',
  },
  {
    name: 'Spotify Podcast',
    url: 'https://open.spotify.com/show/2NivKFK6TdKTJ5BAhwaQrI?si=dc048bf269694d24',
    image: PlaceHolderImages.find(img => img.id === 'media-spotify-podcast'),
    cta: 'Listen on Spotify',
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

  const renderCardContent = (channel: any) => (
    <div className="relative aspect-video w-full h-full flex flex-col">
        <div className="relative w-full aspect-video flex-shrink-0">
            {channel.image && (
                <Image
                    src={channel.image.imageUrl}
                    alt={channel.name}
                    fill
                    data-ai-hint={channel.image.imageHint}
                    className="object-cover w-full h-full"
                />
            )}
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center gap-2 text-white">
                    <span className="font-bold text-lg">{channel.cta}</span>
                </div>
            </div>
        </div>
    </div>
  );


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
              if (channel.type === 'podcast-apple') {
                return (
                  <Dialog key={channel.name}>
                    <DialogTrigger asChild>
                      <motion.div
                        custom={index}
                        variants={cardVariants}
                        initial="initial"
                        whileInView="animate"
                        whileHover="hover"
                        viewport={{ once: true, amount: 0.2 }}
                        className="h-full cursor-pointer"
                      >
                         <StarBorder
                            as="div"
                            color="hsl(var(--primary))"
                            speed="4s"
                            className="h-full block rounded-lg overflow-hidden group"
                          >
                           {renderCardContent(channel)}
                         </StarBorder>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-gray-950/90 border-border/50 text-white backdrop-blur-lg p-0">
                      <DialogHeader className="p-4">
                        <DialogTitle>{channel.name}</DialogTitle>
                         <DialogDescription className="sr-only">
                          An embedded player for the {channel.name} podcast.
                        </DialogDescription>
                      </DialogHeader>
                       <div dangerouslySetInnerHTML={{ __html: channel.embed! }} />
                    </DialogContent>
                  </Dialog>
                )
              }
              
              return (
                <motion.div
                  key={channel.name}
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  className="h-full"
                  asChild
                >
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full block"
                  >
                    <StarBorder
                      as="div"
                      color="hsl(var(--primary))"
                      speed="4s"
                      className="h-full block rounded-lg overflow-hidden group"
                    >
                      {renderCardContent(channel)}
                    </StarBorder>
                  </a>
                </motion.div>
            )})}
        </div>
      </div>
    </SectionWrapper>
  );
}
