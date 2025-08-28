import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <article>
            <h1 className="text-3xl md:text-5xl font-bold font-headline mb-4">{post.title}</h1>
            <p className="text-muted-foreground mb-8">Published on {post.date}</p>
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.hint} />
            </div>
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/blog"> &larr; Back to Blog</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
