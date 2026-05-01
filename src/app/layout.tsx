import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const inter = { variable: "font-inter" };
const outfit = { variable: "font-outfit" };

export const metadata: Metadata = {
  title: "Ekuty Barnabas Ebu | Junior Full Stack Developer Portfolio",
  description: "Junior Full Stack Developer based in Douala, Cameroon. Specialized in React, Next.js, Node.js, and Python. Built 6+ live projects.",
  keywords: ["Junior Full Stack Developer", "React developer", "Next.js developer", "Cameroon developer", "Ekuty Barnabas Ebu", "Basti"],
  authors: [{ name: "Ekuty Barnabas Ebu" }],
  openGraph: {
    title: "Ekuty Ebu | Professional Full-Stack Developer",
    description: "High-performance portfolio showcasing full-stack development expertise by Ekuty Ebu.",
    url: "https://2bigdev-portfolio.vercel.app",
    siteName: "Ekuty Ebu Portfolio",
    images: [
      {
        url: "https://your-portfolio.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekuty Ebu | Professional Full-Stack Developer",
    description: "High-performance portfolio showcasing full-stack development expertise by Ekuty Ebu.",
    images: ["https://2bigdev-portfolio.vercel.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Ekuty Barnabas Ebu",
                "jobTitle": "Junior Full-Stack Developer",
                "url": "https://2bigdev-portfolio.vercel.app",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Douala",
                  "addressCountry": "Cameroon"
                },
                "sameAs": [
                  "https://github.com/ekutyebu/",
                  "https://linkedin.com/in/ekuty-ebu-86a617235/"
                ]
              }),
            }}
          />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
