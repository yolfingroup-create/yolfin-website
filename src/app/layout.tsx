import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingModalProvider } from "@/context/booking-modal-context";
import { TrialBookingModal } from "@/components/modals/trial-booking-modal";
import { SITE_CONFIG } from "@/lib/constants";
import { getPrimaryCTALabel } from "@/lib/supabase/queries";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#071F49",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Accounting & Finance Services",
    "Bookkeeping India",
    "VAT Services UAE",
    "GST Filing India",
    "Travel Management Support",
    "Facility Management Solutions",
    "Yolfin Group",
    "Business Support Malappuram",
    "Business Support UAE",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: fontDetection(),
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
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
};

function fontDetection() {
  return true;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const isAdminRoute = headerList.get("x-is-admin-route") === "true";
  const primaryCtaLabel = await getPrimaryCTALabel();

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-white text-navy font-sans">
        <BookingModalProvider>
          {isAdminRoute ? (
            children
          ) : (
            <>
              <Navbar ctaLabel={primaryCtaLabel} />
              <main className="flex-1">{children}</main>
              <Footer />
            </>
          )}
          <TrialBookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}
