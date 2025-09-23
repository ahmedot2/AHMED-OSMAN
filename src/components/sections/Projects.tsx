
'use client';
import { useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: 'AI Agency Agents',
    category: 'Directories',
    description: 'Unified platform for AI tools and directories—semantic search unlocking innovation from self-taught code.',
    tech: ['Next.js', 'TypeScript', 'Vercel'],
    link: 'https://ai-agency-agents-pied.vercel.app/',
    repo: 'https://github.com/ahmedot2/ai-agency-agents',
    image: PlaceHolderImages.find(img => img.id === 'ai-agency-agents'),
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'FINHUB',
    category: 'Directories',
    description: 'Curated finance resources for stocks and crypto—navigating markets since 2015 with strategic precision.',
    tech: ['Next.js', 'TypeScript', 'Vercel'],
    link: 'https://fin-hub-ivory.vercel.app/',
    repo: 'https://github.com/ahmedot2/fin-hub',
    image: PlaceHolderImages.find(img => img.id === 'finhub'),
    className: '',
  },
  {
    title: 'GlobePulse',
    category: 'Directories',
    description: '2025 travel guide inspired by global layovers—rankings that chart horizons beyond the skies.',
    tech: ['Next.js', 'TypeScript', 'Vercel'],
    link: 'https://globe-pulse-puce.vercel.app/',
    repo: 'https://github.com/ahmedot2/globe-pulse',
    image: PlaceHolderImages.find(img => img.id === 'globepulse'),
    className: '',
  },
    {
    title: 'UN Strategic Perspectives',
    category: 'Directories',
    description: 'Curated frameworks for global impact—blending policy insights with aviation\'s resilient edge.',
    tech: ['Manus.Space', 'Custom JS'],
    link: 'https://zmufmuyy.manus.space/?locale=en#',
    repo: '#',
    image: PlaceHolderImages.find(img => img.id === 'un-strategic-perspectives'),
    className: 'md:col-span-2 md:row-span-1',
  },
];

const filters = ['Directories', 'Blockchain'];

const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 30px -10px hsl(var(--primary))",
    transition: {
      duration: 0.3,
    }
  }
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Directories');

  const filteredProjects = projects.filter(p => activeFilter === 'All' || p.category === activeFilter);

  return (
    <SectionWrapper id="projects" hasBackground>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <h2 className="font-display text-8xl md:text-[120px] font-black uppercase text-primary leading-none tracking-widest">
            PRO <span className="text-white">JECTS</span>
          </h2>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter)}
                className="rounded-full border-primary/50 text-white hover:text-primary hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className={cn("group relative bg-card/30 border border-border/10 rounded-lg overflow-hidden", project.className)}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="overflow-hidden">
                {project.image && (
                  <Image
                    src={project.image.imageUrl}
                    alt={project.title}
                    width={800}
                    height={600}
                    data-ai-hint={project.image.imageHint}
                    className="w-full h-auto object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                )}
              </div>
              <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-4">
                <h3 className="text-3xl font-headline text-white">{project.title}</h3>
                <p className="text-white/70 font-body text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <Badge key={t} variant="secondary" className="bg-white/10 text-white/80 border border-transparent">{t}</Badge>
                  ))}
                </div>
                <div className="flex gap-4 mt-2">
                    <Button asChild><a href={project.link} target="_blank" rel="noopener noreferrer">Live Demo <ExternalLink className="ml-2"/></a></Button>
                    {project.repo !== '#' && (
                      <Button variant="outline" asChild><a href={project.repo} target="_blank" rel="noopener noreferrer">View Code</a></Button>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
            <motion.div
              className="group relative bg-card/30 border border-border/10 rounded-lg overflow-hidden lg:col-span-4"
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="overflow-hidden h-full flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-black/20 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                   <Github className="w-24 h-24 text-white/10" />
                </div>
                <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-4 flex-grow justify-center md:w-1/2">
                    <h3 className="text-3xl font-headline text-white">Explore More Projects</h3>
                    <p className="text-white/70 font-body text-lg leading-relaxed">From code to creation—each project a step in ascent.</p>
                    <div className="flex gap-4 mt-2">
                        <Button asChild size="lg" className="w-full">
                          <a href="https://github.com/ahmedot2" target="_blank" rel="noopener noreferrer">
                              View All on GitHub <ExternalLink className="ml-2"/>
                          </a>
                        </Button>
                    </div>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
