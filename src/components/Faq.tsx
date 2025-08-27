import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How often should my lawn be mowed?',
    answer: 'For most lawns, we recommend weekly mowing during the peak growing season (spring and summer). This can be adjusted based on your specific grass type and weather conditions.',
  },
  {
    question: 'What areas do you service?',
    answer: 'TidyScapes currently services the greater metropolitan area. Please contact us with your address to confirm if you are within our service range.',
  },
  {
    question: 'Are your fertilization and pest control treatments safe for pets and children?',
    answer: 'Yes, we prioritize the safety of your family. We use eco-friendly and pet-safe products. We recommend keeping pets and children off the lawn for a few hours after application to allow it to dry completely.',
  },
  {
    question: 'Do I need to be home for you to perform services?',
    answer: 'No, you do not need to be home as long as our team has access to the areas that need service (e.g., gates are unlocked). We will send a notification upon completion of the work.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-20 bg-card">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="font-headline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
