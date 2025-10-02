import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Analytics from '@/components/Analytics';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'TidyScapes Digital',
  description: 'Modern and professional landscaping services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#63cf17" />
      </head>
      <body className="font-body antialiased bg-background">
        <Analytics />
        <div className="relative w-full overflow-x-hidden">
          {children}
        </div>
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
