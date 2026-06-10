import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oluwaseyi Akinyinka | Frontend Engineer",
  description: "A product-focused frontend engineer specializing in accessible, highly interactive, and beautifully crafted web applications and landing pages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Single ambient background — replaces 4 expensive blurred divs */}
        <div className="fixed inset-0 pointer-events-none z-[-1]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,8,0.6) 100%)' }}
          />
        </div>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
