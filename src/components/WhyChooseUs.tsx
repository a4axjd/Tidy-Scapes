import { Gem, Palette, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: <Gem className="h-10 w-10" />,
    title: "Expertise & Experience",
    description: "Our team brings years of experience and horticultural knowledge to every project, ensuring exceptional results.",
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "Customized Designs",
    description: "We believe every space is unique. We work with you to create a personalized landscape that fits your vision and lifestyle.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10" />,
    title: "Quality Commitment",
    description: "From premium materials to meticulous craftsmanship, we are dedicated to delivering the highest quality in all we do.",
  },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-secondary/30 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose Us</h2>
                    <p className="mt-4 text-lg text-foreground/80">
                        Discover the Tidy Scapes difference. We're committed to quality, creativity, and customer satisfaction.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, index) => (
                         <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                                {reason.icon}
                            </div>
                            <h3 className="text-lg font-bold">{reason.title}</h3>
                            <p className="mt-2 text-sm text-foreground/70">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
