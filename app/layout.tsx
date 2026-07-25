import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axos Labs — The Red Hat of Business AI",
  description:
    "Axos Labs installs persistent AI Brains into your business — on your hardware, integrated with your systems, operating under your oversight.",
  keywords: [
    "AI brain",
    "business AI",
    "enterprise AI",
    "autonomous AI worker",
    "AI automation",
    "private AI",
    "on-premise AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
