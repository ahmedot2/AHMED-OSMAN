
'use client';
import { Home, User, Briefcase, BookOpen, PlaySquare, Mail, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Hero', icon: Home, href: '#hero' },
  { name: 'About', icon: User, href: '#about' },
  { name: 'Projects', icon: Briefcase, href: '#projects' },
  { name: 'Publications', icon: BookOpen, href: '#publications' },
  { name: 'Media', icon: PlaySquare, href: '#media' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

export const NavLink = ({ href, icon: Icon, label, isActive, onClick }: { href: string; icon: React.ElementType; label: string; isActive: boolean, onClick?: () => void }) => (
  <Link href={href} passHref onClick={onClick}>
    <div
      className={`group relative flex items-center justify-center h-12 w-12 transition-colors duration-200 rounded-lg ${
        isActive ? 'bg-primary/20' : ''
      }`}
      aria-label={label}
    >
      <Icon className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-white/70 group-hover:text-primary'}`} />
      <span className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </div>
  </Link>
);

export const NavContent = ({ onLinkClick }: { onLinkClick?: () => void }) => {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean);
    sections.forEach((section) => {
      if(section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if(section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 py-4">
        <Link href="#hero" onClick={onLinkClick}>
            <Terminal className="h-8 w-8 text-white/90 hover:text-primary transition-colors" />
        </Link>
      </div>
      <nav className="flex flex-col items-center gap-2 w-full flex-grow justify-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            href={item.href}
            icon={item.icon}
            label={item.name}
            isActive={activeSection === item.href.substring(1)}
            onClick={onLinkClick}
          />
        ))}
      </nav>
      <div className="mb-4">
        {/* Bottom icons or elements if needed */}
      </div>
    </>
  )
}


export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-20 bg-transparent flex-col items-center z-50 border-r border-white/10 hidden md:flex">
      <NavContent />
    </aside>
  );
}
