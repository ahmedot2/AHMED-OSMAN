'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import {
  Contact,
  FileText,
  Github,
  Home,
  Linkedin,
  Menu,
  Projector,
  Sparkles,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#hero', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: Sparkles },
  { href_alt: '#projects', label_alt: 'Projects', icon_alt: Projector },
  { href: '#publications', label: 'Publications', icon: FileText },
  { href: '#contact', label: 'Contact', icon: Contact },
];

const socialLinks = [
  { href: '#', label: 'GitHub', icon: Github },
  { href: '#', label: 'LinkedIn', icon: Linkedin },
  { href: '#', label: 'Twitter', icon: Twitter },
];

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 text-2xl text-white/80 hover:text-primary transition-colors"
    >
      <Icon className="w-8 h-8" />
      <span>{label}</span>
    </a>
  );
}

export default function Header() {
  return (
    <header className="fixed top-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border-white/20 hover:bg-primary/20">
            <Menu className="w-8 h-8" />
            <span className="sr-only">Open Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-black/80 backdrop-blur-lg border-white/20 text-white w-[350px] sm:w-[420px]">
          <SheetHeader>
            <nav className="flex flex-col h-full justify-between pt-16">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => link.href && (
                  <NavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
                ))}
              </div>
              <div className="flex flex-col gap-8">
                 <div className="flex justify-start gap-4">
                  {socialLinks.map(link => (
                    <Button key={link.label} variant="outline" size="icon" asChild className="bg-transparent border-white/30 hover:border-primary hover:text-primary">
                      <Link href={link.href} target="_blank" aria-label={link.label}>
                        <link.icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-white/40">&copy; {new Date().getFullYear()} Ahmed Osman. All Rights Reserved.</p>
              </div>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
