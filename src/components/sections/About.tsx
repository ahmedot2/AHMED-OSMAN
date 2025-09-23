'use client';
import SectionWrapper from '../SectionWrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '../ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TextType from '../TextType';
import InteractiveImage from '../InteractiveImage';
import { Plane, DollarSign, Github, Briefcase, BookOpen, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const skills = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'Go', 'Rust'] },
  { category: 'Frameworks', items: ['Next.js', 'React', 'Node.js', 'FastAPI'] },
  { category: 'AI/ML', items: ['PyTorch', 'Genkit', 'LangChain', 'Scikit-learn'] },
  { category: 'Infrastructure', items: ['GCP', 'Firebase', 'Docker', 'Kubernetes'] },
];

const milestones = [
    {
        icon: Plane,
        metric: '15,000+ Hours Aloft',
        title: 'Skyward Resilience',
        copy: '12 years with Emirates—turbulence forged into triumph at 30,000 feet.',
        className: 'md:col-span-2',
    },
    {
        icon: DollarSign,
        metric: 'Asset Growth',
        title: 'Wealth Forged',
        copy: 'Navigating the volatile currents of crypto and stocks since 2015—turning market shadows into a symphony of strategic gains.',
        className: 'md:col-span-1',
    },
    {
        icon: Github,
        metric: '1044 GitHub Contributions',
        title: 'Code Ascent',
        copy: 'Self-taught AI and blockchain code—redefining horizons line by line.',
        className: 'md:col-span-1',
    },
    {
        icon: Briefcase,
        metric: '2 Ventures Co-Founded',
        title: 'Venture Vision',
        copy: 'Osman Group and T.O.M Logistics—$1M+ flows from chaos to mastery.',
        className: 'md:col-span-2',
    },
    {
        icon: BookOpen,
        metric: 'UN Papers Authored',
        title: 'Global Wisdom',
        copy: 'Resilience strategies from aviation’s lessons to humanitarian shadows.',
        className: 'md:col-span-3',
    },
    {
        icon: Globe,
        metric: 'Fluent Arabic & English',
        title: 'Cultural Bridges',
        copy: 'Connecting continents—Dubai skies to Cairo strategies in dialogue.',
        className: 'md:col-span-3',
    },
];

export default function About() {
  const [leftColRef, isLeftColVisible] = useScrollAnimation();
  const [skillsRef, areSkillsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [milestonesRef, areMilestonesVisible] = useScrollAnimation({ threshold: 0.1 });


  const bioText = [
    "In the turbulence beneath the surface, shadows over Tokyo whisper secrets of ascent. I've learned: The honey trap of comfort leads nowhere... ...true paths forge through the iron curtain of doubt."
  ];

  const highlightedWords = {
    "Tokyo": "text-primary",
    "honey trap": "text-primary",
    "true paths": "text-primary",
    "iron curtain of doubt": "text-primary",
  };

  return (
    <SectionWrapper id="about" hasBackground>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div 
          ref={leftColRef} 
          className={`flex flex-col gap-8 transition-all duration-1000 ${isLeftColVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
        >
          <InteractiveImage 
            src="/about-image.png"
            alt="Philosophical depiction of challenge"
            width={500}
            height={300}
            data-ai-hint="monochrome abstract"
          />
          
          <div className="text-white/80 leading-relaxed text-lg bg-card/50 p-6 rounded-lg border border-border/20 backdrop-blur-sm min-h-[160px] md:min-h-[140px]">
            <TextType 
                text={bioText}
                highlightedWords={highlightedWords}
                className="text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div 
            ref={skillsRef}
            className={`bg-card/30 p-4 rounded-lg border border-border/10 transition-all duration-700 ${areSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {skills.map((skill, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-white/80 hover:text-white text-lg">{skill.category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skill.items.map((item) => (
                        <Badge key={item} variant="secondary" className="text-sm bg-primary/20 text-primary-foreground border-primary/30">{item}</Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div 
            ref={milestonesRef}
            className={`transition-all duration-700 delay-200 ${areMilestonesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className={cn("bg-card/30 border border-border/10 rounded-lg p-4 text-center flex flex-col items-center justify-center gap-2 group hover:bg-card/50 transition-colors", milestone.className)}>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <p className="font-bold text-lg text-white/90 leading-tight">{milestone.metric}</p>
                    <p className="text-sm text-white/70">{milestone.title}</p>
                    <p className="text-xs text-white/50 mt-2 opacity-0 group-hover:opacity-100 transition-opacity h-0 group-hover:h-auto">{milestone.copy}</p>
                  </div>
                )
              })}
            </div>
             <p className="text-primary font-headline text-3xl text-center mt-8">
                Each milestone lifts the ascent—where will you soar?
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
