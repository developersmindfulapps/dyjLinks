import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "manmohakStree | Exclusive Content",
  description: "Exclusive content from manmohakStree. Your fantasy awaits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed inset-0 w-full h-full background-glow -z-10 pointer-events-none" />
        <main className="min-h-screen flex flex-col items-center py-8 px-4 sm:py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
