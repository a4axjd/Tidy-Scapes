import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreePalm, Tractor, Hammer } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Tractor className="h-10 w-10 text-primary" />,
    title: 'Lawn Care & Mowing',
    description: 'Reliable mowing, fertilization, and weed control services for a healthy, green lawn.',
    link: '/lawn-care',
  },
  {
    icon: <TreePalm className="h-10 w-10 text-primary" />,
    title: 'Tree & Shrub Services',
    description: 'Expert pruning, removal, and planting to keep your trees and shrubs thriving.',
    link: '/tree-service',
  },
  {
    icon: <Hammer className="h-10 w-10 text-primary" />,
    title: 'Hardscaping',
    description: 'Custom patios, walkways, and retaining walls to enhance your outdoor living space.',
    link: '/hardscaping',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Landscaping Services</h2>
          <p className="mt-4 text-lg text-foreground/80">
            We offer a comprehensive range of professional landscaping services tailored to the needs of Dacula, GA homeowners.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col text-center items-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full">
                       {service.icon}
                    </div>
                </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 flex-grow">{service.description}</p>
                 <Button asChild variant="outline" className="mt-6">
                    <Link href={service.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
