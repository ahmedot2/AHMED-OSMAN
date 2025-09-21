'use client';

import { useEffect, useState, useRef } from 'react';
import { Home, User, Briefcase, BookOpen, Youtube, Mail, Dot, Terminal, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"


const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'projects', icon: Briefcase, label: 'Projects' },
  { id: 'publications', icon: BookOpen, label: 'Publications' },
  { id: 'media', icon: Youtube, label: 'Media' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

function DesktopNav({ activeSection }: { activeSection: string }) {
    return (
        <header className="fixed top-0 left-0 h-screen w-16 md:w-20 bg-black flex-col items-center justify-between z-50 border-r border-border/10 py-10 hidden md:flex">
            <Link href="#hero" className="group" aria-label="Ahmed Osman Home">
                <Terminal className="w-8 h-8 text-white/80 group-hover:text-primary transition-colors" />
            </Link>
            <nav>
                <ul className="flex flex-col items-center gap-7">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                    <li key={item.id}>
                        <Link href={`#${item.id}`} className="group relative text-white/60 hover:text-primary transition-colors duration-300" aria-label={item.label}>
                        <Icon className={cn("w-6 h-6 transition-all", isActive && "text-primary scale-110")} />
                        {isActive && (
                            <span className="absolute left-1/2 -translate-x-1/2 -bottom-4 text-primary">
                            <Dot size={24} strokeWidth={10}/>
                            </span>
                        )}
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 border border-border/50 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-x-[-10px] group-hover:translate-x-0 duration-300">
                            {item.label}
                        </div>
                        </Link>
                    </li>
                    );
                })}
                </ul>
            </nav>
            <div />
        </header>
    )
}

function MobileNav() {
    return (
        <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-between z-50 border-b border-border/10 p-4 md:hidden">
            <Link href="#hero" className="group" aria-label="Ahmed Osman Home">
                <Terminal className="w-7 h-7 text-white/80 group-hover:text-primary transition-colors" />
            </Link>
            <Sheet>
                <SheetTrigger>
                    <Menu className="w-7 h-7 text-white/80" />
                </SheetTrigger>
                <SheetContent className="bg-black border-l-border/50" side="right">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <nav className="mt-12">
                        <ul className="flex flex-col items-start gap-4">
                            {navItems.map(item => {
                                const Icon = item.icon;
                                return (
                                <li key={item.id}>
                                    <SheetClose asChild>
                                        <Link href={`#${item.id}`} className="group flex items-center gap-4 text-white/60 hover:text-primary transition-colors duration-300 text-2xl p-2 rounded-md" aria-label={item.label}>
                                            <Icon className="w-6 h-6" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SheetClose>
                                </li>
                                );
                            })}
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )
}


export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const mainContainerRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    mainContainerRef.current = document.querySelector('main');
    const mainContainer = mainContainerRef.current;
    
    if (!mainContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: mainContainer, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const elements = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el!));

    return () => {
      elements.forEach((el) => observer.unobserve(el!));
    };
  }, []);

  return isMobile ? <MobileNav /> : <DesktopNav activeSection={activeSection} />;
}
