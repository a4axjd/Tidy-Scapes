import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    avatar: 'SL',
    image: 'https://picsum.photos/100/100?random=5',
    testimonial: 'TidyScapes completely transformed our backyard. It\'s now our favorite part of the house! The team was professional, creative, and efficient. Highly recommend!',
  },
  {
    name: 'Mark T.',
    avatar: 'MT',
    image: 'https://picsum.photos/100/100?random=6',
    testimonial: 'The best lawn care service we have ever used. Our grass has never looked healthier. They are reliable and the pricing is very fair.',
  },
  {
    name: 'Emily R.',
    avatar: 'ER',
    image: 'https://picsum.photos/100/100?random=7',
    testimonial: 'We had a very large, difficult tree removed. The TidyScapes crew handled it with incredible skill and safety. The cleanup was immaculate.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex-grow">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{item.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-bold">{item.name}</p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{item.testimonial}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
