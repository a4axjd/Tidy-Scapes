"use client";

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !service || !message) {
      toast({ title: "Error", description: "Please fill out all fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        service,
        message,
        timestamp: serverTimestamp(),
      });
      toast({ title: "Success", description: "Your message has been sent!" });
      // Reset form
      setName('');
      setEmail('');
      setService('');
      setMessage('');
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-headline">Get a Free Quote</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="home-name">Full Name</Label>
              <Input id="home-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="bg-background/80 text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-email">Email Address</Label>
              <Input id="home-email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/80 text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="home-service">Service of Interest</Label>
            <Select onValueChange={setService} value={service}>
              <SelectTrigger id="home-service" className="bg-background/80 text-foreground">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lawn-care">Lawn Care</SelectItem>
                <SelectItem value="garden-design">Garden Design</SelectItem>
                <SelectItem value="tree-services">Tree Services</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="home-message">Your Message</Label>
            <Textarea id="home-message" placeholder="Tell us about your project..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-background/80 text-foreground" />
          </div>
          <div className="text-center">
            <Button type="submit" size="lg" variant="secondary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
