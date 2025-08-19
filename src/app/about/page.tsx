import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AboutClient from "@/app/about/AboutClient";

export const metadata: Metadata = {
  metadataBase: new URL('https://unsaid-drab.vercel.app/about'), // Replace with your production URL
  title: 'Unsaid - About',
  description: 'Learn more about our mission, values, and the team behind Unsaid.',
  openGraph: {
    title: 'Unsaid - About',
    description: 'Learn more about our mission, values, and the team behind Unsaid.',
    url: '/about',
    images: [
      {
        url: '/og-image.jpg', // Replace with your Open Graph image path
        width: 1200,
        height: 630,
        alt: 'Unsaid About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unsaid - About',
    description: 'Learn more about our mission, values, and the team behind Unsaid.',
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