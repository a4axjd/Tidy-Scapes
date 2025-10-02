import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, Sparkles, Leaf, Wind } from 'lucide-react';

const lawnCareServices = [
    {
        icon: <Leaf className="h-8 w-8 text-primary" />,
        title: "Weekly Lawn Mowing",
        description: "Professional mowing services to keep your lawn neat and tidy all season long.",
    },
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: "Lawn Fertilization Service",
        description: "Custom fertilization plans to provide your Gwinnett County lawn with the nutrients it needs to thrive.",
    },
    {
        icon: <Wind className="h-8 w-8 text-primary" />,
        title: "Lawn Aeration",
        description: "Core aeration to reduce soil compaction and improve water, air, and nutrient flow to the roots.",
    }
];


export default function LawnCarePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section 
          className="relative bg-cover bg-center" 
          style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://picsum.photos/seed/lawn-hero/1920/1080")'}}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight" data-ai-hint="perfect green lawn">
                Lawn Care Service in Dacula, GA
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                Reliable and affordable lawn care and mowing services for a healthy, beautiful lawn without the hassle.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Comprehensive Lawn Care & Maintenance</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">We provide everything your Dacula lawn needs to look its best.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {lawnCareServices.map((service, index) => (
                        <Card key={index}>
                            <CardHeader className="items-center text-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                   {service.icon}
                                </div>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <div className="mt-12 text-center">
                    <Button asChild size="lg">
                        <Link href="/contact">Get a Free Lawn Care Quote</Link>
                    </Button>
                </div>
            </div>
        </section>
        
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/lawn-mower/600/800" alt="Tidy Scapes team member mowing a lawn" fill className="object-cover" data-ai-hint="person mowing lawn" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">The Tidy Scapes Difference</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                           We're not just a "mow and go" crew. We are lawn care professionals dedicated to the health and beauty of your turf.
                        </p>
                        <ul className="space-y-4 text-lg">
                            <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Reliable Scheduling:</span> We show up on time, every time, so you can count on a consistently maintained lawn.</span>
                            </li>
                             <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Attention to Detail:</span> We edge, trim, and clean up clippings for a crisp, clean finish.</span>
                            </li>
                             <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Local Expertise:</span> We understand Georgia lawns and tailor our approach for the best results in our climate.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
