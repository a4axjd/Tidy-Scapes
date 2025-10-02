"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';
import Image from 'next/image';

const navLinks = [
    { href: "/#services", text: "Services" },
    { href: "/gallery", text: "Gallery" },
    { href: "/blog", text: "Blog" },
    { href: "/visualizer", text: "AI Visualizer" },
    { href: "/contact", text: "Contact" },
];

const TidyScapesLogo = () => (
    <Image src="/file.svg" alt="Tidy Scapes Logo" width={48} height={48} />
);

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <TidyScapesLogo />
          <h2 className="text-xl font-bold">Tidy Scapes</h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                    {link.text}
                </Link>
            ))}
        </nav>

        <div className="flex items-center gap-4">
            <Button asChild className="font-bold text-sm px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                <Link href="#contact">Get a Quote</Link>
            </Button>
            <div className="md:hidden">
              <MobileNav navLinks={navLinks} />
            </div>
        </div>
      </div>
    </header>
  );
}
