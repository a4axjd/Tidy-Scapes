import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Sprout, Trees } from 'lucide-react';

const services = [
  {
    icon: <Scissors className="h-10 w-10 text-primary" />,
    title: 'Lawn Care',
    description: 'Meticulous lawn mowing, edging, and fertilization to keep your grass green and healthy.',
  },
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: 'Garden Design',
    description: 'Creative garden designs, planting, and maintenance for beautiful and vibrant flowerbeds.',
  },
  {
    icon: <Trees className="h-10 w-10 text-primary" />,
    title: 'Tree Services',
    description: 'Expert tree pruning, removal, and planting to ensure the safety and beauty of your property.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto bg-secondary p-4 rounded-full w-fit">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
