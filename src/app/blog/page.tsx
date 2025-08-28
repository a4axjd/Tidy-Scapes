import Header from '@/components/Header';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
