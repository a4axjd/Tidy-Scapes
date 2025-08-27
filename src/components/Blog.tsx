import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const blogPosts = [
  {
    image: 'https://picsum.photos/400/250?random=8',
    hint: 'spring garden',
    title: '5 Tips for a Vibrant Spring Garden',
    description: 'Get your garden ready for the growing season with these essential tips for soil preparation, planting, and more.',
  },
  {
    image: 'https://picsum.photos/400/250?random=9',
    hint: 'green lawn',
    title: 'The Secret to a Lush, Green Lawn',
    description: 'Learn the best practices for watering, fertilizing, and mowing to achieve the perfect lawn.',
  },
  {
    image: 'https://picsum.photos/400/250?random=10',
    hint: 'pruning tree',
    title: 'When to Prune Your Trees and Shrubs',
    description: 'Proper timing is key for pruning. Discover the best time of year to trim your plants for optimal health and growth.',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">From Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
              <div className="relative aspect-video">
                <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.hint}/>
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0">
                    <Link href="#">Read More &rarr;</Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
