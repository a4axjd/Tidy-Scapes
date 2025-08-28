import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
