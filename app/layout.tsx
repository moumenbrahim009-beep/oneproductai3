import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Product AI — Launch your first digital product in 14 days",
  description:
    "A complete, AI-guided protocol that takes you from idea to live product in 14 days. $49. Money-back guarantee.",
  openGraph: {
    title: "One Product AI",
    description: "Launch your first digital product in 14 days.",
    url: "https://oneproductai.com",
    siteName: "One Product AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
