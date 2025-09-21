'use client';
import { useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Project Alpha',
    category: 'Web App',
    description: 'A cutting-edge data analytics platform for enterprise customers.',
    tech: ['Next.js', 'TypeScript', 'GCP', 'AI'],
    link: '#',
    repo: '#',
    image: PlaceHolderImages.find(img => img.id === 'project-1'),
  },
  {
    title: 'Project Beta',
    category: 'Mobile App',
    description: 'A social networking app focused on local communities.',
    tech: ['React Native', 'Firebase', 'Go'],
    link: '#',
    repo: '#',
    image: PlaceHolderImages.find(img => img.id === 'project-2'),
  },
  {
    title: 'Project Gamma',
    category: 'Data Science',
    description: 'A machine learning model for predictive market analysis.',
    tech: ['Python', 'PyTorch', 'Kubernetes'],
    link: '#',
    repo: '#',
    image: PlaceHolderImages.find(img => img.id === 'project-3'),
  },
    {
    title: 'Project Delta',
    category: 'Web App',
    description: 'An e-commerce storefront with a custom headless CMS.',
    tech: ['Next.js', 'Stripe', 'GraphQL'],
    link: '#',
    repo: '#',
    image: PlaceHolderImages.find(img => img.id === 'project-4'),
  },
];

const filters = ['All', 'Web App', 'Mobile App', 'Data Science'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(p => activeFilter === 'All' || p.category === activeFilter);

  return (
    <SectionWrapper id="projects" hasBackground>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="font-headline text-6xl md:text-7xl text-white">Projects</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter)}
                className="rounded-full"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card/30 border border-border/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="overflow-hidden">
                {project.image && (
                  <Image
                    src={project.image.imageUrl}
                    alt={project.title}
                    width={800}
                    height={600}
                    data-ai-hint={project.image.imageHint}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-3xl font-headline text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => (
                    <Badge key={t} variant="secondary" className="bg-white/10 text-white/80">{t}</Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                    <Button asChild><a href={project.link} target="_blank" rel="noopener noreferrer">Live Demo <ExternalLink className="ml-2"/></a></Button>
                    <Button variant="outline" asChild><a href={project.repo} target="_blank" rel="noopener noreferrer">View Code</a></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
