import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Sprout, Trees, Hand, Leaf, Shrub, Tractor, Axe, TreePine } from 'lucide-react';

const services = [
  {
    icon: <Tractor className="h-10 w-10 text-primary" />,
    title: 'Landscape Maintenance',
    description: 'Ongoing care to keep your outdoor spaces pristine, including weeding, mulching, and seasonal cleanups.',
  },
  {
    icon: <Shrub className="h-10 w-10 text-primary" />,
    title: 'Shrub Care',
    description: 'Comprehensive shrub care including fertilization, disease control, and health assessments.',
  },
  {
    icon: <Scissors className="h-10 w-10 text-primary" />,
    title: 'Shrub Pruning & Trimming',
    description: 'Expert pruning and trimming to shape shrubs, promote healthy growth, and enhance flowering.',
  },
  {
    icon: <Hand className="h-10 w-10 text-primary" />,
    title: 'Shrub Transplanting',
    description: 'Safely moving and transplanting shrubs to new locations within your landscape.',
  },
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: 'Tree & Shrub Planting',
    description: 'Professional planting of new trees and shrubs to enhance the beauty and value of your property.',
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: 'Lawn Care',
    description: 'Meticulous lawn mowing, edging, and fertilization to keep your grass green and healthy.',
  },
  {
    icon: <Axe className="h-10 w-10 text-primary" />,
    title: 'Shrub Removal',
    description: 'Efficient removal of unwanted or overgrown shrubs, including root systems.',
  },
  {
    icon: <TreePine className="h-10 w-10 text-primary" />,
    title: 'Tree Care Services',
    description: 'Expert tree pruning, removal, and health assessments to ensure the safety and beauty of your property.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col">
              <CardHeader>
                <div className="mx-auto bg-secondary p-4 rounded-full w-fit">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
