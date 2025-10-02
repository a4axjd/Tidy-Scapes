"use client";

import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/firebase-data';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import type { Project } from '@/lib/firebase-data';


export default function Gallery() {
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
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Gallery</h2>
          <div className="text-center">Loading gallery...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">Our Landscaping Projects</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Explore our portfolio of successful landscaping transformations, showcasing our commitment to quality and client satisfaction.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="group relative overflow-hidden rounded-lg shadow-lg">
                <Link href={`/blog/${project.slug}`}>
                    <div className="w-full h-96 relative">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                            data-ai-hint={project.hint}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ease-in-out transform translate-y-[calc(100%-4.5rem)] group-hover:translate-y-0">
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <div className="mt-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">View Details &rarr;</div>
                    </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
