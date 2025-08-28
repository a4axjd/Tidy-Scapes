import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { projects } from '@/lib/portfolio-data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                    <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover"
                        data-ai-hint={project.hint}
                    />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{project.title}</h1>
                    <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
                    <div className="space-y-2">
                        <h3 className="font-bold text-xl">Project Details</h3>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {project.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center">
                <Button asChild variant="outline">
                    <Link href="/portfolio">&larr; Back to Portfolio</Link>
                </Button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
