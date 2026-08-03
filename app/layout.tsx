import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/animations/motion-provider";
import { NeuralBackground } from "@/components/animations/neural-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axos Labs — Persistent AI Brains for Business",
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

// Always provide a key so ClerkProvider never crashes at build.
// A real key on Railway enables actual auth; dummy key keeps builds passing locally.
const clerkKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_cGxhY2Vob2xkZXI";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased`}
        >
          <MotionProvider>
            <div className="fixed inset-0 -z-10" aria-hidden>
              <NeuralBackground />
            </div>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </MotionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
