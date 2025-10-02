import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="relative bg-cover bg-center" 
      style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://picsum.photos/seed/hero/1920/1080")'}}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-48 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight" data-ai-hint="landscaped garden">
            Transforming Spaces, Enhancing Lives
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Your trusted partner for exceptional landscaping services. From design to maintenance, we bring your vision to life.
          </p>
          <Button asChild size="lg" className="mt-8 inline-block bg-primary text-primary-foreground font-bold text-base px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors">
            <Link href="#services">Explore Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
