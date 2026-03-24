import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Murat Atilgan | Senior Systems & AI Engineer",
  description: "Bridging deep-tech AI research with tangible business outcomes. Specializing in LLM Orchestration, RAG pipelines, and Agentic AI workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
