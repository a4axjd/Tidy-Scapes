import { Leaf, Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">TidyScapes</span>
            </div>
            <p className="text-muted-foreground">Transforming outdoor spaces with professional care and design.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/visualizer" className="text-muted-foreground hover:text-primary">AI Visualizer</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-headline">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <span>123 Green St, Meadowville, 12345</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <a href="mailto:hello@tidyscapes.com" className="hover:text-primary">hello@tidyscapes.com</a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <a href="tel:+11234567890" className="hover:text-primary">(123) 456-7890</a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-headline">Follow Us</h3>
            <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TidyScapes Digital. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
