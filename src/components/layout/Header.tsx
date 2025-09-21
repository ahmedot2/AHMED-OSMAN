'use client';

import { Terminal, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '../ui/switch';

const navItems = [
  { id: 'life', label: 'Life' },
  { id: 'loves', label: 'Loves' },
  { id: 'works', label: 'Works' },
  { id: 'thoughts', label: 'Thoughts' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8">
      <div className="flex justify-between items-center max-w-full mx-auto">
        <Link href="#hero" className="group" aria-label="Home">
          <Terminal className="w-8 h-8 text-white/80 group-hover:text-primary transition-colors" />
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map(item => (
              <li key={item.id}>
                <Link href={`#${item.id}`} className="group relative text-white/80 hover:text-white transition-colors duration-300 text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
            <Sun className="h-5 w-5 text-white/80" />
            <Switch 
                aria-label="Toggle dark mode"
            />
            <Moon className="h-5 w-5 text-white/80" />
        </div>
      </div>
    </header>
  );
}
