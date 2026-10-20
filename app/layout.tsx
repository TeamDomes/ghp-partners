import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Partner with GHPN — Community Impact Plans for NY Cannabis Licensees",
  description:
    "Build your OCM Community Impact Plan in partnership with Greater Hudson Promise Neighborhood in Hudson, NY.",
  // Keep the site out of search engines while outreach is direct. Delete this line to allow indexing.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Work+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
