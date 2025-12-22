import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientProviders from '@/components/ClientProviders';
import { Analytics } from "@vercel/analytics/next"

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ['500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Unsaid",
  description: "We believe that mental health support should be accessible to everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} antialiased`}
      >
        <Analytics/>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}