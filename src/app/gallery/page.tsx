import Header from '@/components/Header';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
