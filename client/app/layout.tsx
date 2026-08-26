import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

// Font for English
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font for Arabic
export const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

// Metadata
export const metadata: Metadata = {
  title: "EDUCore",
  description:
    "EDUCore is a platform that connects students with mentors and provides access to high-quality courses. Our mission is to empower learners to achieve their goals through personalized guidance and comprehensive learning resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
