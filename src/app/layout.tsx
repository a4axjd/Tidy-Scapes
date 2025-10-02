import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Analytics from '@/components/Analytics';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'Tidy Scapes | Landscaping & Lawn Care in Dacula, GA',
  description: 'Professional landscaping, reliable lawn care, and custom hardscaping services in Dacula, GA and Gwinnett County. Contact Tidy Scapes for a free quote!',
};

const LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Tidy Scapes",
  "image": "https://www.tidyscapesllc.com/TidyScapes.png",
  "@id": "https://www.tidyscapesllc.com/",
  "url": "https://www.tidyscapesllc.com/",
  "telephone": "(470) 925-2782",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dacula",
    "addressRegion": "GA",
    "postalCode": "30019",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.0834, 
    "longitude": -83.8966
  },
  "areaServed": [
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 34.0834,
        "longitude": -83.8966
      },
      "geoRadius": "24140"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "07:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "08:00",
      "closes": "18:00"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LocalBusinessSchema) }}
        />
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
