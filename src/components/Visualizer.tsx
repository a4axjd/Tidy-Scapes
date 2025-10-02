"use client";

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { visualizeLandscapingIdeas } from '@/ai/flows/visualize-landscaping-ideas';
import type { VisualizeLandscapingIdeasOutput } from '@/ai/flows/visualize-landscaping-ideas';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { UploadCloud, Sparkles, Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const services = [
    { id: 'includeLawnCare', label: 'Lawn Care' },
    { id: 'includeGardenDesign', label: 'Garden Design' },
    { id: 'includeTreeServices', label: 'Tree Services' },
    { id: 'includeLandscapeMaintenance', label: 'Landscape Maintenance' },
    { id: 'includeShrubCare', label: 'Shrub Care' },
    { id: 'includeShrubPruning', label: 'Shrub Pruning/Trimming' },
    { id: 'includeShrubTransplanting', label: 'Shrub Transplanting' },
    { id: 'includeTreePlanting', label: 'Tree Planting' },
    { id: 'includeShrubPlanting', label: 'Shrub Planting' },
    { id: 'includeShrubRemoval', label: 'Shrub Removal' },
];

export default function Visualizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [options, setOptions] = useState({
    includeLawnCare: true,
    includeGardenDesign: true,
    includeTreeServices: false,
    includeLandscapeMaintenance: false,
    includeShrubCare: false,
    includeShrubPruning: false,
    includeShrubTransplanting: false,
    includeTreePlanting: false,
    includeShrubPlanting: false,
    includeShrubRemoval: false,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VisualizeLandscapingIdeasOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null); // Clear previous result
    }
  };
  
  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
  });

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please upload an image of your property.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const photoDataUri = await toBase64(file);
      const aiResult = await visualizeLandscapingIdeas({
        photoDataUri,
        ...options
      });
      setResult(aiResult);
    } catch (error) {
      console.error(error);
      toast({
        title: "Visualization failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="visualizer" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <Wand2 className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-headline">AI Landscaping Visualizer</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Upload a photo of your property and let our AI show you the potential. Select the services you're interested in to customize the visualization.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">1. Your Property</CardTitle>
                <CardDescription>Upload a photo and select your desired services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="property-photo">Upload Photo</Label>
                    <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input id="property-photo" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                      {previewUrl ? (
                        <Image src={previewUrl} alt="Property preview" fill className="object-contain rounded-lg p-2" />
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <UploadCloud className="mx-auto h-12 w-12" />
                          <p>Click to upload or drag and drop</p>
                          <p className="text-xs">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </div>
                </div>
                <div className="space-y-4">
                    <Label>Select Services to Visualize</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {services.map(service => (
                            <div key={service.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={service.id} 
                                    checked={options[service.id as keyof typeof options]} 
                                    onCheckedChange={() => handleOptionChange(service.id as keyof typeof options)} 
                                />
                                <Label htmlFor={service.id} className="font-normal">{service.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
              </CardContent>
              <CardFooter>
                 <Button onClick={handleSubmit} disabled={loading || !file} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {loading ? 'Visualizing...' : 'Visualize Your Dream Yard'}
                 </Button>
              </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">2. AI-Powered Vision</CardTitle>
                    <CardDescription>See a reimagined version of your property.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && (
                        <div className="space-y-4">
                            <Skeleton className="w-full h-80 rounded-lg" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-3/4 h-6" />
                        </div>
                    )}
                    {result ? (
                        <div className="space-y-4">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                                <Image src={result.enhancedImage} alt="AI enhanced property" fill className="object-cover" />
                            </div>
                            <h3 className="font-bold">Description of Changes:</h3>
                            <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                    ) : !loading && (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-96 border-2 border-dashed rounded-lg">
                           <Wand2 className="h-12 w-12 mb-4" />
                           <p>Your AI visualization will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
