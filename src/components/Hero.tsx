import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Beautifully landscaped garden"
        fill
        className="object-cover brightness-50"
        priority
        data-ai-hint="landscaped garden"
      />
      <div className="relative z-10 p-4 max-w-3xl animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
          Transform Your Outdoor Space
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Professional lawn care, garden design, and tree services to bring your vision to life.
        </p>
        <Button asChild size="lg">
          <Link href="#contact">Get a Free Quote</Link>
        </Button>
      </div>
    </section>
  );
}
