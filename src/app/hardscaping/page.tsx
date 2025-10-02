import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const hardscapingServices = [
    {
        title: "Paver Patios",
        description: "Custom-designed paver patios to create a stunning outdoor living area for relaxation and entertainment.",
        image: "https://picsum.photos/seed/patio/600/400",
        hint: "paver patio"
    },
    {
        title: "Walkways & Garden Paths",
        description: "Beautiful and functional walkways that guide you through your landscape with elegance and durability.",
        image: "https://picsum.photos/seed/walkway/600/400",
        hint: "stone walkway"
    },
    {
        title: "Retaining Walls",
        description: "Expertly engineered retaining walls to manage slopes, prevent erosion, and add dimension to your yard.",
        image: "https://picsum.photos/seed/retainingwall/600/400",
        hint: "retaining wall"
    }
];

export default function HardscapingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section 
          className="relative bg-cover bg-center" 
          style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://picsum.photos/seed/hardscaping-hero/1920/1080")'}}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight" data-ai-hint="stone patio">
                Dacula Hardscape & Patio Installation
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                Transform your backyard with beautiful, durable hardscapes. We design and build custom patios, walkways, and retaining walls.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Hardscaping Services</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">From elegant patios to functional retaining walls, we build hardscapes that last.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {hardscapingServices.map((service) => (
                        <Card key={service.title} className="overflow-hidden">
                            <div className="relative aspect-video">
                                <Image src={service.image} alt={service.title} fill className="object-cover" data-ai-hint={service.hint} />
                            </div>
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Why Choose Tidy Scapes for Your Hardscape Project?</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                           We combine expert craftsmanship with high-quality materials to create hardscapes that are not only beautiful but also built to withstand the Georgia climate.
                        </p>
                        <ul className="space-y-4 text-lg">
                            <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Expert Design:</span> We work with you to design a hardscape that complements your home and meets your needs.</span>
                            </li>
                             <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Quality Materials:</span> We use only the best pavers, stones, and blocks for a long-lasting finish.</span>
                            </li>
                             <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Professional Installation:</span> Our experienced team ensures your project is built to the highest standards.</span>
                            </li>
                        </ul>
                         <Button asChild size="lg" className="mt-8">
                            <Link href="/contact">Get Your Free Hardscaping Quote</Link>
                        </Button>
                    </div>
                    <div className="relative h-96 rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/hardscape-choose/600/800" alt="Team building a paver patio" fill className="object-cover" data-ai-hint="landscapers working" />
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
