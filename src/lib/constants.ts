export const SITE_CONFIG = {
  name: "Yolfin Group",
  tagline: "Your Growth. Our Responsibility.",
  subTagline: "We don't just manage your business, we help it grow.",
  description:
    "Professional business support solutions covering Accounting & Finance, Travel Management, and Facility Management across India and UAE.",
  domain: "yolfin.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yolfin.com",
  contact: {
    email: "yolfingroup@gmail.com",
    phoneIndia: "+91 95629 75022",
    phoneIndiaDisplay: "+91 95629 75022",
    phoneUAE: "+971 556646580",
    phoneUAEDisplay: "+971 55 664 6580",
    whatsappUrl: "https://wa.me/919562975022",
    address: {
      street: "Office No. 11/501, Areekode Road",
      city: "Kondotty",
      district: "Malappuram",
      state: "Kerala",
      postalCode: "673638",
      country: "India",
      formatted: "Office No. 11/501, Areekode Road, Kondotty, Malappuram, Kerala 673638, India",
    },
  },
  markets: ["India", "UAE"],
  services: [
    {
      id: "accounting-finance",
      title: "Accounting & Finance",
      slug: "accounting-finance",
      shortDescription:
        "Comprehensive bookkeeping, VAT/GST compliance, financial reporting, and payroll management.",
      status: "active",
    },
    {
      id: "travel-management",
      title: "Travel Management",
      slug: "travel-management",
      shortDescription:
        "End-to-end corporate travel planning, flight bookings, visa assistance, and expense reporting.",
      status: "coming_soon",
    },
    {
      id: "facility-management",
      title: "Facility Management",
      slug: "facility-management",
      shortDescription:
        "Integrated facility operations, building maintenance, vendor management, and office administrative support.",
      status: "coming_soon",
    },
  ],
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Why Us", href: "/why-us" },
    { name: "Contact Us", href: "/contact" },
  ],
  cta: {
    primaryText: "Book 1 Month Free",
    primaryHref: "/contact?type=trial",
  },
} as const;
