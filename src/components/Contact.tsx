"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function Contact() {
  
  return (
    <section id="contact" className="py-16 sm:py-24 text-center bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-foreground/80">Contact us today for a free consultation and let's discuss your landscaping needs.</p>
          <Button asChild size="lg" className="mt-8 inline-block bg-primary text-primary-foreground font-bold text-base px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
