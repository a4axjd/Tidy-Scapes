import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TreePalm, Tractor, Flower } from 'lucide-react';

const services = [
  {
    icon: <TreePalm className="h-8 w-8 text-primary" />,
    title: 'Landscape Design',
    description: 'Crafting unique outdoor spaces that reflect your style and enhance your property\'s beauty.',
  },
  {
    icon: <Tractor className="h-8 w-8 text-primary" />,
    title: 'Garden Maintenance',
    description: 'Keeping your landscape vibrant and healthy with regular care, including mowing, pruning, and fertilization.',
  },
  {
    icon: <Flower className="h-8 w-8 text-primary" />,
    title: 'Custom Projects',
    description: 'Bringing your specific landscaping ideas to life with custom installations and renovations.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/80">
            We offer a comprehensive range of landscaping services tailored to meet your needs and exceed your expectations.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-background p-6 rounded-xl border border-border">
              <div className="text-primary">
                {service.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
