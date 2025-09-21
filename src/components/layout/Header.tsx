'use client';

import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const navLinks = [
  { href: '#', label: 'Life' },
  { href: '#', label: 'Loves' },
  { href: '#', label: 'Works' },
  { href: '#', label: 'Thoughts' },
  { href: '#', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        {/* Left: Logo */}
        <Link href="/">
          <Terminal className="h-8 w-8 text-white" />
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-white hover:text-primary transition-colors">
                {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Theme Toggle */}
        <div className="flex items-center gap-2">
            <Label htmlFor="theme-toggle" className="sr-only">Toggle Dark Mode</Label>
            <Switch id="theme-toggle" defaultChecked={true} />
        </div>
      </div>
    </header>
  );
}
