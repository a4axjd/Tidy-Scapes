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

const TidyScapesLogo = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="white" stroke="#E0E0E0" strokeWidth="2"/>
      <path d="M6 30C9.5 26 12.5 25 16 26C20 27.5 21.5 31 24.5 33C27.5 35 30 34 33 32C36 30 38.5 29 42 30" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 34C9.5 30 12.5 29 16 30C20 31.5 21.5 35 24.5 37C27.5 39 30 38 33 36C36 34 38.5 33 42 34" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
      <path d="M38.5 15.5C38.7761 15.5 39 15.2761 39 15C39 14.7239 38.7761 14.5 38.5 14.5C38.2239 14.5 38 14.7239 38 15C38 15.2761 38.2239 15.5 38.5 15.5Z" fill="#4CAF50" stroke="#4CAF50"/>
      <path d="M40 14.5C40.2761 14.5 40.5 14.2761 40.5 14C40.5 13.7239 40.2761 13.5 40 13.5C39.7239 13.5 39.5 13.7239 39.5 14C39.5 14.2761 39.7239 14.5 40 14.5Z" fill="#4CAF50" stroke="#4CAF50"/>
      <path d="M36 14C36.2761 14 36.5 13.7761 36.5 13.5C36.5 13.2239 36.2761 13 36 13C35.7239 13 35.5 13.2239 35.5 13.5C35.5 13.7761 35.7239 14 36 14Z" fill="#4CAF50" stroke="#4CAF50"/>
      <path d="M9.42627 24.8141C9.42627 22.873 10.3958 22.5698 11.1397 22.5698C11.8837 22.5698 12.7104 22.8123 13.1238 23.5386C13.5372 24.2649 13.0624 25.1328 12.3185 25.4959C11.5746 25.859 10.7479 25.5558 10.3345 24.8295C10.1278 24.4664 9.92107 24.2042 9.42627 24.8141Z" fill="#4CAF50"/>
      <path d="M12.3185 22.5091C13.849 22.5091 15.2367 23.5386 15.2367 24.8141C15.2367 26.0896 14.2672 27.0583 12.9329 27.0583C11.5986 27.0583 10.9248 26.0896 10.9248 24.8141C10.9248 23.5386 11.5986 22.5091 12.3185 22.5091Z" fill="#4CAF50"/>
      <path d="M38 14.5L37 13.5L36 14" stroke="#4CAF50" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.3155 37.3879C12.311 36.5681 10.8576 32.7483 13.2173 29.624C15.577 26.4998 19.6416 26.6818 23.2363 27.5616C26.831 28.4414 30.121 29.8809 30.9407 33.141C31.7605 36.4012 28.056 38.3005 24.6416 39.0401C21.2272 39.7796 18.8973 37.9078 16.3155 37.3879Z" fill="#4CAF50"/>
      <path d="M17.153 36.4881C15.0135 36.0182 14.3341 33.8686 15.717 32.2291C17.0999 30.5896 19.5192 30.6496 21.6587 31.0595C23.7981 31.4693 26.1578 32.3489 26.6775 34.0284C27.1972 35.7079 25.5178 36.7675 23.5192 37.1773C21.5207 37.5872 18.5921 36.798 17.153 36.4881Z" fill="white"/>
      <path d="M19.1558 35.8284C17.8362 35.5585 17.4465 34.2488 18.2361 33.2492C19.0258 32.2495 20.3454 32.2495 21.605 32.5194C22.8646 32.7892 24.1843 33.329 24.5139 34.2488C24.8436 35.1685 23.7641 35.8284 22.5646 36.0982C21.365 36.3681 20.0155 36.0182 19.1558 35.8284Z" fill="#4CAF50"/>
    </svg>
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
