"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TreePalm, Tractor, Flower, Wrench, Leaf, Scissors, Move, Sprout, Axe } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import projects from '@/lib/placeholder-images.json';

const allServices = [
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: 'Landscape Maintenance',
    description: 'Comprehensive care to keep your outdoor spaces looking their best year-round.',
    image: projects.services[0].image,
    hint: projects.services[0].hint,
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Shrub Care',
    description: 'Specialized care plans to ensure your shrubs are healthy, vibrant, and well-maintained.',
    image: projects.services[1].image,
    hint: projects.services[1].hint,
  },
  {
    icon: <Scissors className="h-8 w-8 text-primary" />,
    title: 'Shrub Pruning & Trimming',
    description: 'Expert pruning and trimming to shape shrubs for optimal health and aesthetics.',
    image: projects.services[2].image,
    hint: projects.services[2].hint,
  },
  {
    icon: <Move className="h-8 w-8 text-primary" />,
    title: 'Shrub Transplanting',
    description: 'Safely moving and transplanting shrubs to new locations within your landscape.',
    image: projects.services[3].image,
    hint: projects.services[3].hint,
  },
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    title: 'Tree Planting',
    description: 'Professional planting services for new trees to enhance your property.',
    image: projects.services[4].image,
    hint: projects.services[4].hint,
  },
  {
    icon: <Tractor className="h-8 w-8 text-primary" />,
    title: 'Lawn Care',
    description: 'Complete lawn care services including mowing, fertilization, and weed control.',
    image: projects.services[5].image,
    hint: projects.services[5].hint,
  },
  {
    icon: <Flower className="h-8 w-8 text-primary" />,
    title: 'Shrub Planting',
    description: 'Planting new shrubs to add beauty and structure to your garden beds.',
    image: projects.services[6].image,
    hint: projects.services[6].hint,
  },
  {
    icon: <Axe className="h-8 w-8 text-primary" />,
    title: 'Shrub Removal',
    description: 'Safe and efficient removal of unwanted or overgrown shrubs from your property.',
    image: projects.services[7].image,
    hint: projects.services[7].hint,
  },
  {
    icon: <TreePalm className="h-8 w-8 text-primary" />,
    title: 'Tree Care Services',
    description: 'A full range of tree care services, including health assessments and maintenance.',
    image: projects.services[8].image,
    hint: projects.services[8].hint,
  },
   {
    icon: <Flower className="h-8 w-8 text-primary" />,
    title: 'Landscape Design',
    description: 'Crafting unique outdoor spaces that reflect your style and enhance your property\'s beauty.',
     image: projects.services[9].image,
    hint: projects.services[9].hint,
  },
  {
    icon: <Tractor className="h-8 w-8 text-primary" />,
    title: 'Garden Maintenance',
    description: 'Keeping your landscape vibrant and healthy with regular care, including mowing, pruning, and fertilization.',
    image: projects.services[10].image,
    hint: projects.services[10].hint,
  },
  {
    icon: <TreePalm className="h-8 w-8 text-primary" />,
    title: 'Custom Projects',
    description: 'Bringing your specific landscaping ideas to life with custom installations and renovations.',
    image: projects.services[11].image,
    hint: projects.services[11].hint,
  },
];

const featuredServices = allServices.slice(-3);


export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/80">
            We offer a comprehensive range of landscaping services tailored to meet your needs and exceed your expectations.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <div key={index} className="bg-background p-6 rounded-xl border border-border">
              <div className="text-primary">
                {service.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">View All Services</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-center mb-4">Our Services</DialogTitle>
                        <DialogDescription className="text-center text-lg text-muted-foreground">
                            Explore our full range of expert landscaping solutions.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                        {allServices.map((service, index) => (
                            <Card key={index} className="flex flex-col overflow-hidden">
                                <div className="relative aspect-video">
                                    <Image src={service.image} alt={service.title} fill className="object-cover" data-ai-hint={service.hint}/>
                                </div>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="text-primary">{service.icon}</div>
                                        <CardTitle>{service.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </section>
  );
}
