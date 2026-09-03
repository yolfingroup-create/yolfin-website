import type { Metadata } from "next";
import {
  getPublishedServices,
  getWhyYolfinItems,
  getPublishedSeoMetadata,
  getImagePlacements,
} from "@/lib/supabase/queries";
import { Hero } from "@/components/home/hero";
import { TrustHighlights } from "@/components/home/trust-highlights";
import { TrialBanner } from "@/components/home/trial-banner";
import { ServicesSection } from "@/components/home/services-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyUsPreview } from "@/components/home/why-us-preview";
// import { FinalCTA } from "@/components/home/final-cta";
import { SITE_CONFIG } from "@/lib/constants";
import type { SEOMetadataRow } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = (await getPublishedSeoMetadata("/")) as SEOMetadataRow | null;

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      openGraph: {
        title: seoData.og_title || seoData.title,
        description: seoData.og_description || seoData.description,
        url: SITE_CONFIG.url,
      },
    };
  }

  return {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  };
}

export default async function HomePage() {
  const [services, whyItems, homepageImages] = await Promise.all([
    getPublishedServices(),
    getWhyYolfinItems(),
    getImagePlacements(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        "name": SITE_CONFIG.name,
        "url": SITE_CONFIG.url,
        "email": SITE_CONFIG.contact.email,
        "telephone": SITE_CONFIG.contact.phoneIndia,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": SITE_CONFIG.contact.address.street,
          "addressLocality": SITE_CONFIG.contact.address.city,
          "addressRegion": SITE_CONFIG.contact.address.state,
          "postalCode": SITE_CONFIG.contact.address.postalCode,
          "addressCountry": "IN",
        },
        "slogan": SITE_CONFIG.tagline,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        "url": SITE_CONFIG.url,
        "name": SITE_CONFIG.name,
        "publisher": {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Homepage Flow */}
      <div className="flex flex-col min-h-screen">
        {/* A. Hero Section (Dynamic Hero Image support) */}
        <Hero heroImage={homepageImages.heroImage} />

        {/* B. Trust Highlights Strip */}
        <TrustHighlights />

        {/* C. 1-Month Free Trial Banner */}
        

        {/* D. Services Grid Section (Powered by Supabase DB) */}
        <ServicesSection services={services} />

        {/* E. Additional Trust Bar */}
        <TrustBar />

        {/* F. Why Yolfin Preview Section (Dynamic Why Us Image support) */}
        <WhyUsPreview items={whyItems} whyUsImage={homepageImages.whyUsImage} />

        {/* G. Final Bottom Conversion CTA */}
        {/* <FinalCTA /> */}
        <TrialBanner />
      </div>
    </>
  );
}
