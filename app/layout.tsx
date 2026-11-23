import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://scam-signal-opal.vercel.app"),
  title: {
    default: "ScamSignal — Suspicious SMS, WhatsApp & Email Message Analyzer",
    template: "%s | ScamSignal",
  },
  description:
    "ScamSignal is an independent, privacy-first educational tool that helps people assess suspicious text messages, WhatsApp chats, and emails for phishing, social engineering, and fraud warning signs.",
  keywords: [
    "scam checker",
    "phishing detector",
    "sms scam check",
    "smishing analyzer",
    "whatsapp scam verification",
    "email scam checker",
    "fraud prevention",
    "social engineering",
  ],
  authors: [{ name: "ScamSignal Security Initiative" }],
  creator: "ScamSignal",
  publisher: "ScamSignal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ScamSignal",
    title: "ScamSignal — Suspicious SMS, WhatsApp & Email Message Analyzer",
    description:
      "Assess suspicious messages, detect urgency tricks, credential harvesting, and suspicious links. Privacy-first with zero message retention.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScamSignal — Suspicious Message Risk Analyzer",
    description:
      "Assess suspicious text messages, WhatsApp chats, and emails for phishing and fraud warning signs. Privacy-first, zero message retention.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ScamSignal",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://scamsignal.vercel.app",
    "description":
      "Free educational web application to assess suspicious SMS, WhatsApp, and email messages for social engineering and phishing indicators.",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
