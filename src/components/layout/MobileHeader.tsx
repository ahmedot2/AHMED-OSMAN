
'use client';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Terminal } from 'lucide-react';
import { NavContent } from './Sidebar';
import Link from 'next/link';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLinkClick = () => {
    setIsOpen(false);
  }

  return (
    <header className="md:hidden sticky top-0 z-40 w-full bg-black/50 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="#hero" className="flex items-center gap-2" onClick={handleLinkClick}>
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Ahmed Osman</span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-black border-r-white/10 flex flex-col">
            <NavContent onLinkClick={handleLinkClick} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
