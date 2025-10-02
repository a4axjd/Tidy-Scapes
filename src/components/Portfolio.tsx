"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getProjects } from '@/lib/firebase-data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Project } from '@/lib/firebase-data';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Our Recent Work</h2>
          {/* You can add a skeleton loader here if you want */}
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="portfolio" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Our Recent Work</h2>
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.slug} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden transition-shadow hover:shadow-xl rounded-xl">
                    <Link href={`/portfolio/${project.slug}`}>
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={600}
                          className="object-cover w-full h-full"
                          data-ai-hint={project.hint}
                        />
                      </CardContent>
                    </Link>
                  </Card>
                  <div className="mt-4 text-center">
                      <h3 className="font-bold text-lg">
                        <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                      </h3>
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