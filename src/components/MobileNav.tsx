"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Leaf } from 'lucide-react';

interface NavLink {
  href: string;
  text: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export default function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-3/4">
        <div className="flex flex-col h-full">
            <div className="border-b pb-4">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">TidyScapes</span>
                </Link>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-medium mt-8 flex-grow">
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                >
                    {link.text}
                </Link>
            ))}
            </nav>
            <div className="mt-auto">
                <Button asChild className="w-full" size="lg">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>Get a Free Quote</Link>
                </Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
