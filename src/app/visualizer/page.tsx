import Header from '@/components/Header';
import Visualizer from '@/components/Visualizer';
import Footer from '@/components/Footer';

export default function VisualizerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Visualizer />
      </main>
      <Footer />
    </div>
  );
}
