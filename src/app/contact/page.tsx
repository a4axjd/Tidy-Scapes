import Header from '@/components/Header';
import ContactPageContent from '@/components/ContactPageContent';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ContactPageContent />
      </main>
      <Footer />
    </div>
  );
}
