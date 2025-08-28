import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-headline">Get a Free Quote</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="home-name">Full Name</Label>
              <Input id="home-name" placeholder="John Doe" className="bg-background/80 text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-email">Email Address</Label>
              <Input id="home-email" type="email" placeholder="john.doe@example.com" className="bg-background/80 text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="home-service">Service of Interest</Label>
            <Select>
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
            <Textarea id="home-message" placeholder="Tell us about your project..." rows={5} className="bg-background/80 text-foreground" />
          </div>
          <div className="text-center">
            <Button type="submit" size="lg" variant="secondary">Submit Request</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
