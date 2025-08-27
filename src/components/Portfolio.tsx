import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const projects = [
  {
    image: 'https://picsum.photos/600/400?random=1',
    hint: 'modern backyard',
    title: 'Modern Backyard Oasis',
    description: 'A complete overhaul featuring a new patio, fire pit, and drought-tolerant plants.',
  },
  {
    image: 'https://picsum.photos/600/400?random=2',
    hint: 'front yard',
    title: 'Elegant Front Yard Curb Appeal',
    description: 'New flower beds and a stone walkway to enhance the home\'s entrance.',
  },
  {
    image: 'https://picsum.photos/600/400?random=3',
    hint: 'commercial property',
    title: 'Commercial Property Maintenance',
    description: 'Ongoing lawn and garden care for a professional and welcoming business exterior.',
  },
  {
    image: 'https://picsum.photos/600/400?random=4',
    hint: 'tree trimming',
    title: 'Large Oak Tree Pruning',
    description: 'Safe and strategic pruning to improve tree health and aesthetics.',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Our Recent Work</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                        data-ai-hint={project.hint}
                      />
                    </CardContent>
                  </Card>
                  <div className="mt-2 text-center">
                      <h3 className="font-bold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
