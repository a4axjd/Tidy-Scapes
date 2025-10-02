import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TreePalm, Tractor, Flower, Wrench, Leaf, Scissors, Move, Sprout, Axe } from 'lucide-react';

const services = [
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: 'Landscape Maintenance',
    description: 'Comprehensive care to keep your outdoor spaces looking their best year-round.',
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Shrub Care',
    description: 'Specialized care plans to ensure your shrubs are healthy, vibrant, and well-maintained.',
  },
  {
    icon: <Scissors className="h-8 w-8 text-primary" />,
    title: 'Shrub Pruning & Trimming',
    description: 'Expert pruning and trimming to shape shrubs for optimal health and aesthetics.',
  },
  {
    icon: <Move className="h-8 w-8 text-primary" />,
    title: 'Shrub Transplanting',
    description: 'Safely moving and transplanting shrubs to new locations within your landscape.',
  },
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    title: 'Tree Planting',
    description: 'Professional planting services for new trees to enhance your property.',
  },
  {
    icon: <Tractor className="h-8 w-8 text-primary" />,
    title: 'Lawn Care',
    description: 'Complete lawn care services including mowing, fertilization, and weed control.',
  },
  {
    icon: <Flower className="h-8 w-8 text-primary" />,
    title: 'Shrub Planting',
    description: 'Planting new shrubs to add beauty and structure to your garden beds.',
  },
  {
    icon: <Axe className="h-8 w-8 text-primary" />,
    title: 'Shrub Removal',
    description: 'Safe and efficient removal of unwanted or overgrown shrubs from your property.',
  },
  {
    icon: <TreePalm className="h-8 w-8 text-primary" />,
    title: 'Tree Care Services',
    description: 'A full range of tree care services, including health assessments and maintenance.',
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
