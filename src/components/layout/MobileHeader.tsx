
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavContent } from './Sidebar';
import { Button } from '../ui/button';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="md:hidden fixed top-4 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black/80 backdrop-blur-lg border-r-white/10 text-white p-0 w-64">
                <div className="flex h-full flex-col">
                    <NavContent onLinkClick={() => setIsOpen(false)} />
                </div>
            </SheetContent>
        </Sheet>
    </header>
  );
}
