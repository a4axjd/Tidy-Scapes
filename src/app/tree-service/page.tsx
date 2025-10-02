import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, Axe, Sprout, Scissors } from 'lucide-react';

const treeServices = [
    {
        icon: <Scissors className="h-8 w-8 text-primary" />,
        title: "Shrub & Tree Trimming",
        description: "Expert pruning to improve health, structure, and appearance. We service shrubs and trees of all sizes.",
    },
    {
        icon: <Axe className="h-8 w-8 text-primary" />,
        title: "Shrub & Tree Removal",
        description: "Safe and efficient removal of unwanted, dead, or hazardous trees and shrubs from your property.",
    },
    {
        icon: <Sprout className="h-8 w-8 text-primary" />,
        title: "Tree & Shrub Planting",
        description: "Professional planting services to help you choose and install the right trees and shrubs for your landscape.",
    }
];

export default function TreeServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section 
          className="relative bg-cover bg-center" 
          style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://picsum.photos/seed/tree-hero/1920/1080")'}}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight" data-ai-hint="large oak tree">
                Tree Service in Dacula, GA
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                Professional tree and shrub trimming, removal, and planting services for a safe and beautiful landscape.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Tree & Shrub Services</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">Complete care for the biggest assets in your landscape.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {treeServices.map((service, index) => (
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
                        <Link href="/contact">Get a Free Tree Service Estimate</Link>
                    </Button>
                </div>
            </div>
        </section>
        
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                     <div className="relative h-96 rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/tree-work/600/800" alt="Arborist trimming a large tree" fill className="object-cover" data-ai-hint="arborist tree" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Safe, Reliable, and Insured</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                           Tree work can be dangerous. Our experienced and insured team has the right equipment to handle any job, big or small, with the utmost care for your property.
                        </p>
                        <ul className="space-y-4 text-lg">
                            <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Safety First:</span> Our top priority is the safety of our crew and your home.</span>
                            </li>
                             <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Property Protection:</span> We take every precaution to prevent damage to your lawn and landscape during tree work.</span>
                            </li>
                             <li className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><span className="font-bold">Thorough Cleanup:</span> We leave your property looking better than we found it, with all debris hauled away.</span>
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
