import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://2bigdev.vercel.app"),
  title: {
    default: "Ekuty Barnabas Ebu | Junior Full Stack Developer & Engineer",
    template: "%s | Ekuty Ebu"
  },
  description: "Junior Full Stack Developer & Software Engineer based in Douala, Cameroon. Expert in React, Next.js, Node.js, and Python. Available for hire and freelance.",
  keywords: [
    "Ekuty Barnabas Ebu", "Basti", "Full Stack Developer Cameroon", "Software Engineer Douala", 
    "React Developer", "Next.js Expert", "Node.js Developer", "Python Engineer", 
    "Web Development Cameroon", "Portfolio", "Junior Developer for hire"
  ],
  authors: [{ name: "Ekuty Barnabas Ebu" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ekuty Ebu | Full-Stack Developer Portfolio",
    description: "Building high-performance digital experiences with modern technology.",
    url: "https://2bigdev.vercel.app",
    siteName: "Ekuty Ebu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekuty Ebu | Full-Stack Developer",
    description: "Junior Full Stack Developer specialized in building scalable web applications.",
  },
  verification: {
    google: "google2199dc2362a1a338",
    yandex: "ed1a5f4cbf8ee645",
    me: "ebubarna1@gmail.com",
    other: {
      "msvalidate.01": "bing_verification_code",
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1832286453723558"
            crossOrigin="anonymous"
          ></script>
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
