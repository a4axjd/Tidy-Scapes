import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function Blog() {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">From Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-video">
                  <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.hint}/>
                </div>
              </Link>
              <CardHeader>
                <CardTitle className="font-headline">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0">
                    <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
