import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPageContent() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Get in Touch</h3>
              <p className="text-muted-foreground">
                We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>
            </div>
            <div className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-primary" />
                    <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <span>hello@tidyscapes.com</span>
                </div>
                <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-primary" />
                    <span>123 Green St, Meadowville, 12345</span>
                </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold font-headline mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service of Interest</Label>
                <Select>
                  <SelectTrigger id="service">
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
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Tell us about your project..." rows={5} />
              </div>
              <div>
                <Button type="submit" size="lg" className="w-full">Submit Request</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16">
            <h3 className="text-2xl font-bold font-headline mb-6 text-center">Our Location</h3>
            <div className="aspect-video w-full max-w-5xl mx-auto bg-muted rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.608356161476!2d-73.98784438459418!3d40.74844097932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!3f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620312015888!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of TidyScapes Location"
                ></iframe>
            </div>
        </div>
      </div>
    </section>
  );
}
