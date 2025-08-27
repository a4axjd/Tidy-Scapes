import { Leaf, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">TidyScapes</span>
          </div>
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TidyScapes Digital. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
