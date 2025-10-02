"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getBlogPosts, type BlogPost } from '@/lib/firebase-data';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Blog() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getBlogPosts();
        setAllPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  useEffect(() => {
    const results = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, allPosts]);

  if (loading) {
    return (
        <section id="blog" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center">Loading posts...</div>
            </div>
        </section>
    )
  }

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <section id="blog" className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">From Our Blog</h2>
            <p className="mx-auto mt-4 max-w-3xl text-foreground/60">
              Explore our articles and tips on landscaping, gardening, and outdoor living. Learn from our experts and enhance your outdoor space.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-foreground/40" />
            </div>
            <Input 
              type="search" 
              placeholder="Search articles" 
              className="w-full rounded-lg border-primary/20 bg-background py-3 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary dark:border-primary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-12">
            {featuredPost && (
              <section>
                <h3 className="mb-6 text-2xl font-bold">Featured Article</h3>
                <div className="grid gap-8">
                  <article className="group overflow-hidden rounded-xl border border-primary/20 bg-background shadow-sm transition-all hover:shadow-lg">
                    <Link href={`/blog/${featuredPost.slug}`}>
                        <div className="grid md:grid-cols-2">
                             <div className="relative h-64 w-full md:h-auto">
                                <Image 
                                    src={featuredPost.image} 
                                    alt={featuredPost.title} 
                                    fill
                                    className="object-cover"
                                    data-ai-hint={featuredPost.hint}
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-foreground/60 mb-2">{featuredPost.date}</p>
                                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{featuredPost.title}</h4>
                                <p className="mt-2 text-sm text-foreground/60">{featuredPost.description}</p>
                                <Button variant="link" className="mt-4 p-0">Read More &rarr;</Button>
                            </div>
                        </div>
                    </Link>
                  </article>
                </div>
              </section>
            )}
            
            {otherPosts.length > 0 && (
                <section>
                    <h3 className="mb-6 text-2xl font-bold">More Articles</h3>
                    <div className="space-y-8">
                        {otherPosts.map((post) => (
                           <article key={post.slug} className="group grid gap-6 rounded-xl border border-primary/20 bg-background p-4 shadow-sm transition-all hover:shadow-md md:grid-cols-3">
                                <div className="md:col-span-2">
                                    <p className="text-sm text-foreground/60 mb-2">{post.date}</p>
                                    <h4 className="text-lg font-bold">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                                    </h4>
                                    <p className="mt-2 text-sm text-foreground/60 hidden sm:block">{post.description}</p>
                                     <Button asChild variant="link" className="mt-4 p-0">
                                        <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                                     </Button>
                                </div>
                                <Link href={`/blog/${post.slug}`} className="block h-40 w-full rounded-lg bg-cover bg-center md:h-full overflow-hidden">
                                     <div className="relative w-full h-full">
                                         <Image 
                                            src={post.image} 
                                            alt={post.title} 
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                            data-ai-hint={post.hint}
                                        />
                                     </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {!featuredPost && !loading && (
                <div className="text-center py-12 text-foreground/60">
                    <p>No articles found matching your search.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}