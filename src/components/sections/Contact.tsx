'use client';
import { useState, useRef, FormEvent } from 'react';
import SectionWrapper from '../SectionWrapper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import BlurText from '../BlurText';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.5 }, false);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill out all fields before sending.',
      });
      return;
    }

    const subject = `Contact Form Submission from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:theagencyagents@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client",
      description: "Please complete sending the message in your email application.",
    });

    formRef.current?.reset();
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <SectionWrapper id="contact" hasBackground>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <h2 ref={titleRef} className="font-display text-8xl md:text-[120px] font-black uppercase text-primary leading-none tracking-widest">
            {isTitleVisible ? <BlurText text="CON" animateBy="chars" key={String(isTitleVisible)} /> : 'CON'}<span className="text-white">TACT</span>
          </h2>
          <p className="text-white/70 text-lg">
            Have a project in mind, a question, or just want to connect? Drop me a line using the form, or email me directly at{' '}
            <a href="mailto:theagencyagents@gmail.com" className="text-primary hover:underline">
              theagencyagents@gmail.com
            </a>
            . I&apos;m always open to discussing new ideas and opportunities.
          </p>
        </div>
        <div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/80">Message</Label>
              <Textarea id="message" name="message" placeholder="Tell me about your project or inquiry..." rows={6} required onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Send Message <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
