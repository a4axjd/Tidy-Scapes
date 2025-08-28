import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block font-headline">TidyScapes</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/#services" className="transition-colors hover:text-primary">Services</Link>
            <Link href="/#portfolio" className="transition-colors hover:text-primary">Portfolio</Link>
            <Link href="/visualizer" className="transition-colors hover:text-primary">AI Visualizer</Link>
            <Link href="/#blog" className="transition-colors hover:text-primary">Blog</Link>
            <Link href="/#contact" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
