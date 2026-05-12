import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
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
    default: "Ekuty Barnabas Ebu | Global Full-Stack Engineer & AI Architect",
    template: "%s | Ekuty Ebu"
  },
  description: "Global Full-Stack Engineer specialized in High-Performance Systems, AI Integration, and Edge Computing. Engineering for a borderless digital world.",
  keywords: [
    "Ekuty Barnabas Ebu", "2BigDev", "Global Full Stack Developer", "AI Architect", 
    "React Developer", "Next.js Expert", "Node.js Developer", "Python Engineer", 
    "Debian", "Windows Development", "Portfolio"
  ],
  authors: [{ name: "Ekuty Barnabas Ebu" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ekuty Ebu | Global Full-Stack Developer",
    description: "Engineering high-performance, planet-scale digital infrastructure.",
    url: "https://2bigdev.vercel.app",
    siteName: "Ekuty Ebu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekuty Ebu | Global Developer",
    description: "Scalable systems and AI-integrated web architecture.",
  },
  verification: {
    google: "google2199dc2362a1a338",
    yandex: "ed1a5f4cbf8ee645",
    me: "ebubarna1@gmail.com",
    other: {
      "msvalidate.01": "bing_verification_code",
    }
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
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(109156114, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109156114" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        
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
                "jobTitle": "Global Full-Stack Engineer",
                "url": "https://2bigdev.vercel.app",
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
