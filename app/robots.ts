import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://scam-signal-opal.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/privacy", "/limitations"],
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
