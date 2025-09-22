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

const skills = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'Go', 'Rust'] },
  { category: 'Frameworks', items: ['Next.js', 'React', 'Node.js', 'FastAPI'] },
  { category: 'AI/ML', items: ['PyTorch', 'Genkit', 'LangChain', 'Scikit-learn'] },
  { category: 'Infrastructure', items: ['GCP', 'Firebase', 'Docker', 'Kubernetes'] },
];

const milestones = [
  { year: '2023', event: 'Launched AI-powered analytics platform, reaching 1M users.' },
  { year: '2021', event: 'Published "Architecting Intelligence" with O\'Reilly.' },
  { year: '2019', event: 'Led team to win a Webby Award for Best User Experience.' },
  { year: '2016', event: 'Developed an open-source library with 10k+ stars on GitHub.' },
];

export default function About() {
  const [leftColRef, isLeftColVisible] = useScrollAnimation();
  const [rightColRef, isRightColVisible] = useScrollAnimation();

  return (
    <SectionWrapper id="about" hasBackground>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div 
          ref={leftColRef} 
          className={`flex flex-col gap-6 transition-all duration-1000 ${isLeftColVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
        >
          
          <div className="text-white/80 leading-relaxed text-lg bg-card/50 p-6 rounded-lg border border-border/20 backdrop-blur-sm">
             <p>
                In the turbulence beneath the surface, shadows over <span className="text-primary">Tokyo</span> whisper secrets of ascent. I've learned: The <span className="text-primary">honey trap</span> of comfort leads nowhere—<span className="text-primary">true paths</span> forge through the <span className="text-primary">iron curtain of doubt</span>.
            </p>
          </div>
        </div>

        <div 
          ref={rightColRef}
          className={`flex flex-col gap-8 transition-all duration-1000 delay-300 ${isRightColVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
        >
          <div className="bg-card/30 p-4 rounded-lg border border-border/10">
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
          <div className="bg-card/30 p-4 rounded-lg border border-border/10">
            <h3 className="text-3xl font-headline mb-4 text-white/90">Milestones</h3>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="font-bold text-primary w-12 text-right shrink-0">{milestone.year}</div>
                  <div className="h-full w-px bg-border/50"></div>
                  <p className="text-white/70 group-hover:text-white transition-colors">{milestone.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
