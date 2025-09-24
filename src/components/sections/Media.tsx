
import SectionWrapper from '../SectionWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Eye, Users, PlayCircle } from 'lucide-react';
import { Button } from '../ui/button';

const channels = [
  {
    name: "Tech Talks",
    subscribers: "1.2M",
    views: "150M",
    videos: [
      { title: "AI in 2024", duration: "12:34", image: PlaceHolderImages.find(img => img.id === 'youtube-1') },
      { title: "The Future of Web Dev", duration: "22:01", image: PlaceHolderImages.find(img => img.id === 'youtube-2') },
      { title: "Quantum Computing Explained", duration: "18:56", image: PlaceHolderImages.find(img => img.id === 'youtube-1') },
    ]
  },
  {
    name: "Code Streams",
    subscribers: "750K",
    views: "80M",
     videos: [
      { title: "Building a Next.js App", duration: "2:10:45", image: PlaceHolderImages.find(img => img.id === 'youtube-2') },
      { title: "Live Debugging a Go API", duration: "1:45:10", image: PlaceHolderImages.find(img => img.id === 'youtube-1') },
      { title: "Rust for Beginners", duration: "3:05:00", image: PlaceHolderImages.find(img => img.id === 'youtube-2') },
    ]
  },
];

export default function Media() {
  return (
    <SectionWrapper id="media" hasBackground>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-6xl md:text-[120px] font-black uppercase leading-none tracking-widest">
            <span className="text-primary block">Media &</span><span className="text-white">Appearances</span>
        </h2>
        <Tabs defaultValue={channels[0].name} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border-border/20">
            {channels.map(channel => (
              <TabsTrigger key={channel.name} value={channel.name} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {channel.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {channels.map(channel => (
            <TabsContent key={channel.name} value={channel.name}>
              <Card className="bg-transparent border-none">
                <CardContent className="p-0 pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-white/70">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-bold text-white">{channel.subscribers}</span> Subscribers
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Eye className="w-5 h-5 text-primary" />
                        <span className="font-bold text-white">{channel.views}</span> Total Views
                      </div>
                    </div>
                     <Button asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Visit Channel <PlayCircle className="ml-2" />
                      </a>
                    </Button>
                  </div>
                  
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent>
                      {channel.videos.map((video, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                          <div className="p-1">
                            <Card className="bg-card/50 border-border/20 group overflow-hidden">
                              <CardContent className="relative flex aspect-video items-center justify-center p-0">
                                {video.image && (
                                  <Image 
                                    src={video.image.imageUrl} 
                                    alt={video.title} 
                                    width={1280} 
                                    height={720} 
                                    data-ai-hint={video.image.imageHint}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                  <h4 className="text-xl font-bold text-white">{video.title}</h4>
                                  <p className="text-sm text-white/70">{video.duration}</p>
                                </div>
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <PlayCircle className="w-16 h-16 text-primary" />
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-white -left-4" />
                    <CarouselNext className="text-white -right-4" />
                  </Carousel>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SectionWrapper>
  );
}
