"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Leaf } from 'lucide-react';
import Image from 'next/image';

interface NavLink {
  href: string;
  text: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

const TidyScapesLogo = () => (
    <Image src="/file.svg" alt="Tidy Scapes Logo" width={48} height={48} />
);

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
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                    <TidyScapesLogo />
                    <span className="font-bold text-lg">Tidy Scapes</span>
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
             <Link
                href="/contact"
                className="transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
            >
                Contact
            </Link>
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
