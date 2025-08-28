import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/firebase-data';
import { Card, CardContent } from '@/components/ui/card';

export default async function Gallery() {
  const projects = await getProjects();

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <Card key={project.slug} className="overflow-hidden group relative">
                <Link href={`/portfolio/${project.slug}`} className="block">
                    <div className="relative aspect-square">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            data-ai-hint={project.hint}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <h3 className="text-white text-lg font-bold text-center">{project.title}</h3>
                        </div>
                    </div>
                </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
