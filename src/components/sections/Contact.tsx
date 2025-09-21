'use client';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import SectionWrapper from '../SectionWrapper';
import { handleContactForm } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader, Github, Linkedin, Phone, Send } from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" /> Sending...
        </>
      ) : (
        <>
          Send Message <Send className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}

const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#'},
    { name: 'LinkedIn', icon: Linkedin, href: '#'},
    { name: 'Calendly', icon: Send, href: '#'},
    { name: 'Phone', icon: Phone, href: '#'},
]

export default function Contact() {
  const initialState = { errors: null, summary: null, success: false };
  const [state, dispatch] = useActionState(handleContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Message Sent!",
        description: "Your message has been successfully sent. Here's a quick summary:",
      });
      formRef.current?.reset();
    } else if (state.summary && !state.success) { // Handle server error case
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: state.summary,
      });
    }
  }, [state, toast]);

  return (
    <SectionWrapper id="contact" hasBackground>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="font-headline text-6xl md:text-7xl text-white">Contact</h2>
          <p className="text-white/70 text-lg">
            Have a project in mind, a question, or just want to connect? Drop me a line. I'm always open to discussing new ideas and opportunities.
          </p>
          <div className="mt-4">
            <h3 className="font-headline text-3xl text-white mb-4">Or, have a chat.</h3>
            <div className="flex gap-4">
              {socialLinks.map(link => (
                <Button key={link.name} variant="outline" size="icon" asChild>
                  <Link href={link.href} target="_blank" aria-label={link.name}>
                    <link.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div>
          {state.success ? (
            <div className="bg-card/50 border border-green-500/30 rounded-lg p-8 text-center flex flex-col items-center justify-center h-full">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="font-headline text-2xl text-white mb-2">Thank You!</h3>
              <p className="text-white/70 mb-4">Your message has been received. I will get back to you shortly.</p>
              <h4 className="font-bold text-white mt-4">AI Summary of your message:</h4>
              <blockquote className="text-sm text-white/60 mt-2 p-4 bg-black/30 rounded-md border border-border/20 italic">
                {state.summary}
              </blockquote>
            </div>
          ) : (
            <form ref={formRef} action={dispatch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
                {state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">Message</Label>
                <Textarea id="message" name="message" placeholder="Tell me about your project or inquiry..." rows={6} required />
                {state.errors?.message && <p className="text-red-500 text-sm">{state.errors.message[0]}</p>}
              </div>
              <div className="flex justify-end">
                <SubmitButton />
              </div>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
