import type { Metadata } from "next";
import { Anton, Inter, Manrope, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/chrome/Providers";
import { DevMark } from "@/components/chrome/DevMark";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.metaTitle,
  description: site.metaDescription,
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${instrument.variable} ${anton.variable}`}
    >
      <head>
        <meta name="theme-color" content="#eef0f2" />
      </head>
      <body className="cloud-bg-texture min-h-screen font-sans antialiased">
        <Providers>
          {children}
          <DevMark />
        </Providers>
      </body>
    </html>
  );
}
