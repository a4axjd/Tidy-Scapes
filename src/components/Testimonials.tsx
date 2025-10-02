import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'Homeowner',
    image: 'https://picsum.photos/seed/person1/100/100',
    testimonial: 'Tidy Scapes transformed our backyard into a stunning oasis! The team was professional, creative, and attentive to every detail. We couldn\'t be happier with the result.',
  },
  {
    name: 'Mark T.',
    title: 'Business Owner',
    image: 'https://picsum.photos/seed/person2/100/100',
    testimonial: 'The new landscaping has significantly improved our property\'s curb appeal. Tidy Scapes delivered on time and within budget. Highly recommended for commercial projects.',
  },
  {
    name: 'Emily & David R.',
    title: 'Family in Dacula',
    image: 'https://picsum.photos/seed/person3/100/100',
    testimonial: 'We are so grateful for the beautiful garden Tidy Scapes created for us. It\'s our new favorite spot to relax and spend time together as a family. Thank you!',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Client Testimonials</h2>
          <p className="mt-4 text-lg text-foreground/80">Hear what our satisfied clients have to say about their Tidy Scapes experience.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center mb-4">
                <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={item.image} alt={item.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-foreground/70">{item.title}</p>
                </div>
              </div>
              <p className="text-foreground/80">"{item.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
