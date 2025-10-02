import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const TidyScapesLogo = () => (
    <Image src="/file.svg" alt="Tidy Scapes Logo" width={48} height={48} />
);

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <TidyScapesLogo />
              <h2 className="text-xl font-bold">Tidy Scapes</h2>
            </Link>
            <p className="mt-4 text-sm text-foreground/70">
              Transforming your outdoor space into a beautiful and functional extension of your home.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/#services" className="text-foreground/70 hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="text-foreground/70 hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-foreground/70">
          <p>© {new Date().getFullYear()} Tidy Scapes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
