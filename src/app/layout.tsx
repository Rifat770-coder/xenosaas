import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
export const metadata: Metadata = {
  title: "XenoSaas | Web Development, UI/UX & Digital Solutions",
  description: site.description,
  ...(site.url
    ? { metadataBase: new URL(site.url), alternates: { canonical: site.url } }
    : {}),
  openGraph: {
    title: "XenoSaas — Ambitious ideas. Extraordinary experiences.",
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
