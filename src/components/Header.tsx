import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';

const navLinks = [
    { href: "/#services", text: "Services" },
    { href: "/portfolio", text: "Portfolio" },
    { href: "/gallery", text: "Gallery" },
    { href: "/visualizer", text: "AI Visualizer" },
    { href: "/blog", text: "Blog" },
    { href: "/contact", text: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold inline-block font-headline">TidyScapes</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                        {link.text}
                    </Link>
                ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
                <Button asChild>
                    <Link href="/contact">Get a Quote</Link>
                </Button>
            </div>

            <div className="md:hidden">
                <MobileNav navLinks={navLinks} />
            </div>
        </div>
      </div>
    </header>
  );
}
