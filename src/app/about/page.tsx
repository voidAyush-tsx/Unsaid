import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AboutClient from "@/app/about/AboutClient";

export const metadata: Metadata = {
  metadataBase: new URL('https://unsaid-drab.vercel.app'), // Replace with your production URL
  title: 'Get In Touch - Unsaid',
  description: 'Contact our team for support and inquiries. Fill out the form or reach out directly.',
  openGraph: {
    title: 'Get In Touch - Unsaid',
    description: 'Contact our team for support and inquiries. Fill out the form or reach out directly.',
    url: '/get_in_touch',
    images: [
      {
        url: '/og-image.jpg', // Replace with your Open Graph image path
        width: 1200,
        height: 630,
        alt: 'Unsaid Get In Touch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get In Touch - Unsaid',
    description: 'Contact our team for support and inquiries.',
    images: ['/twitter-image.jpg'], // Replace with your Twitter image path
  },
};

// Main page component with Suspense boundary
export default function About() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutClient />
    </Suspense>
  );
}