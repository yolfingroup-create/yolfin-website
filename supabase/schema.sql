-- ============================================================================
-- YOLFIN GROUP CORPORATE WEBSITE - REVISED DATABASE SCHEMA (PHASE 2 FINAL)
-- Single-file reproducible & re-runnable database architecture for Supabase SQL Editor
-- Security Model: Single-Admin Verification via public.is_admin() with search_path hardening
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. HELPER FUNCTIONS & SINGLE-ADMIN AUTHORIZATION
-- ----------------------------------------------------------------------------

-- Function to handle updated_at timestamps automatically
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_catalog;

-- Hardened Single-Admin Security Verification Function
-- Strictly checks authenticated session email claim against designated admin yolfingroup@gmail.com
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'authenticated'
        AND LOWER(COALESCE(auth.jwt() ->> 'email', '')) = 'yolfingroup@gmail.com'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public, pg_catalog;

-- ----------------------------------------------------------------------------
-- 2. TABLES DECLARATION
-- ----------------------------------------------------------------------------

-- 2.1 Media Assets Metadata (Cloudinary References)
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id TEXT NOT NULL UNIQUE,
    secure_url TEXT NOT NULL,
    width INTEGER CHECK (width > 0),
    height INTEGER CHECK (height > 0),
    format VARCHAR(20),
    alt_text TEXT,
    folder VARCHAR(100) DEFAULT 'yolfin',
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 Site Settings (Key-Value / Global Configuration)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.3 Services Categories
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]+$'),
    short_description TEXT NOT NULL,
    detailed_description TEXT,
    icon_name VARCHAR(100),
    hero_image_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'coming_soon' CHECK (status IN ('active', 'coming_soon', 'draft')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.4 Service Items / Specific Features
CREATE TABLE IF NOT EXISTS public.service_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon_name VARCHAR(100),
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.5 Why Yolfin Benefits & Differentiators
CREATE TABLE IF NOT EXISTS public.why_yolfin_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100),
    category VARCHAR(50) DEFAULT 'why_choose',
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.6 Yolfin vs Traditional Comparison Grid Items
CREATE TABLE IF NOT EXISTS public.comparison_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feature_label VARCHAR(150) NOT NULL,
    traditional_value TEXT NOT NULL,
    yolfin_value TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.7 Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    designation VARCHAR(150),
    location VARCHAR(150),
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.8 Homepage Content Sections
CREATE TABLE IF NOT EXISTS public.homepage_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key VARCHAR(100) NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.9 About Page Content Sections
CREATE TABLE IF NOT EXISTS public.about_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key VARCHAR(100) NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.10 Contact Enquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email VARCHAR(255) NOT NULL CHECK (email LIKE '%@%'),
    phone VARCHAR(50) NOT NULL CHECK (char_length(trim(phone)) >= 5),
    company_name VARCHAR(150),
    service_category VARCHAR(100),
    subject VARCHAR(200),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 5),
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'converted', 'closed', 'spam')),
    internal_notes TEXT,
    ip_address VARCHAR(50),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.11 1-Month Free Trial Bookings
CREATE TABLE IF NOT EXISTS public.trial_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email VARCHAR(255) NOT NULL CHECK (email LIKE '%@%'),
    phone VARCHAR(50) NOT NULL CHECK (char_length(trim(phone)) >= 5),
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    company_name VARCHAR(150),
    tax_classification VARCHAR(50) CHECK (tax_classification IN ('uae_vat', 'indian_gst', 'other', 'none')),
    services_interested TEXT[] DEFAULT '{}',
    industry VARCHAR(100),
    employee_count VARCHAR(50),
    brief_requirements TEXT,
    preferred_start_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'onboarded', 'declined', 'spam')),
    internal_notes TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.12 Dynamic SEO Metadata
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    keywords TEXT[],
    canonical_url TEXT,
    og_title VARCHAR(200),
    og_description TEXT,
    og_image_url TEXT,
    no_index BOOLEAN NOT NULL DEFAULT false,
    structured_data JSONB DEFAULT '{}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_status_pub ON public.services(status, is_published);
CREATE INDEX IF NOT EXISTS idx_service_items_service ON public.service_items(service_id, is_active);
CREATE INDEX IF NOT EXISTS idx_why_yolfin_active ON public.why_yolfin_items(display_order) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_comparison_active ON public.comparison_items(display_order) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_pub ON public.testimonials(display_order) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries(status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_trial_bookings_status ON public.trial_bookings(status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_seo_metadata_path ON public.seo_metadata(page_path) WHERE is_published = true;

-- ----------------------------------------------------------------------------
-- 4. RE-RUNNABLE TRIGGERS FOR UPDATED_AT
-- ----------------------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_media_assets_updated_at ON public.media_assets;
CREATE TRIGGER trg_media_assets_updated_at BEFORE UPDATE ON public.media_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_services_updated_at ON public.services;
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_service_items_updated_at ON public.service_items;
CREATE TRIGGER trg_service_items_updated_at BEFORE UPDATE ON public.service_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_why_yolfin_updated_at ON public.why_yolfin_items;
CREATE TRIGGER trg_why_yolfin_updated_at BEFORE UPDATE ON public.why_yolfin_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_comparison_items_updated_at ON public.comparison_items;
CREATE TRIGGER trg_comparison_items_updated_at BEFORE UPDATE ON public.comparison_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER trg_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_homepage_content_updated_at ON public.homepage_content;
CREATE TRIGGER trg_homepage_content_updated_at BEFORE UPDATE ON public.homepage_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_about_content_updated_at ON public.about_content;
CREATE TRIGGER trg_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_contact_inquiries_updated_at ON public.contact_inquiries;
CREATE TRIGGER trg_contact_inquiries_updated_at BEFORE UPDATE ON public.contact_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_trial_bookings_updated_at ON public.trial_bookings;
CREATE TRIGGER trg_trial_bookings_updated_at BEFORE UPDATE ON public.trial_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_seo_metadata_updated_at ON public.seo_metadata;
CREATE TRIGGER trg_seo_metadata_updated_at BEFORE UPDATE ON public.seo_metadata FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) ENABLEMENT
-- ----------------------------------------------------------------------------
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_yolfin_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparison_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 6. RE-RUNNABLE RLS POLICIES
-- Security Strategy:
-- Single Admin is strictly enforced via public.is_admin() (Checks auth.role() = 'authenticated' AND trusted jwt email = 'yolfingroup@gmail.com')
-- Public (anon) users can SELECT published content, and INSERT into form submission tables ONLY.
-- ----------------------------------------------------------------------------

-- 6.1 Media Assets RLS
DROP POLICY IF EXISTS "Public media assets read" ON public.media_assets;
DROP POLICY IF EXISTS "Admin media assets write" ON public.media_assets;
CREATE POLICY "Public media assets read" ON public.media_assets FOR SELECT USING (is_published = true);
CREATE POLICY "Admin media assets write" ON public.media_assets FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.2 Site Settings RLS
DROP POLICY IF EXISTS "Public settings read" ON public.site_settings;
DROP POLICY IF EXISTS "Admin settings write" ON public.site_settings;
CREATE POLICY "Public settings read" ON public.site_settings FOR SELECT USING (is_public = true);
CREATE POLICY "Admin settings write" ON public.site_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.3 Services RLS
DROP POLICY IF EXISTS "Public services read" ON public.services;
DROP POLICY IF EXISTS "Admin services write" ON public.services;
CREATE POLICY "Public services read" ON public.services FOR SELECT USING (is_published = true AND status != 'draft');
CREATE POLICY "Admin services write" ON public.services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.4 Service Items RLS (PUBLIC SELECT STRICTLY VERIFIES PARENT SERVICE PUBLICATION STATE)
DROP POLICY IF EXISTS "Public service items read" ON public.service_items;
DROP POLICY IF EXISTS "Admin service items write" ON public.service_items;
CREATE POLICY "Public service items read" ON public.service_items FOR SELECT USING (
    is_active = true
    AND EXISTS (
        SELECT 1 FROM public.services s
        WHERE s.id = service_items.service_id
          AND s.is_published = true
          AND s.status != 'draft'
    )
);
CREATE POLICY "Admin service items write" ON public.service_items FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.5 Why Yolfin Items RLS
DROP POLICY IF EXISTS "Public why yolfin read" ON public.why_yolfin_items;
DROP POLICY IF EXISTS "Admin why yolfin write" ON public.why_yolfin_items;
CREATE POLICY "Public why yolfin read" ON public.why_yolfin_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admin why yolfin write" ON public.why_yolfin_items FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.6 Comparison Items RLS
DROP POLICY IF EXISTS "Public comparison items read" ON public.comparison_items;
DROP POLICY IF EXISTS "Admin comparison items write" ON public.comparison_items;
CREATE POLICY "Public comparison items read" ON public.comparison_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admin comparison items write" ON public.comparison_items FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.7 Testimonials RLS
DROP POLICY IF EXISTS "Public testimonials read" ON public.testimonials;
DROP POLICY IF EXISTS "Admin testimonials write" ON public.testimonials;
CREATE POLICY "Public testimonials read" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Admin testimonials write" ON public.testimonials FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.8 Homepage Content RLS
DROP POLICY IF EXISTS "Public homepage content read" ON public.homepage_content;
DROP POLICY IF EXISTS "Admin homepage content write" ON public.homepage_content;
CREATE POLICY "Public homepage content read" ON public.homepage_content FOR SELECT USING (is_published = true);
CREATE POLICY "Admin homepage content write" ON public.homepage_content FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.9 About Content RLS
DROP POLICY IF EXISTS "Public about content read" ON public.about_content;
DROP POLICY IF EXISTS "Admin about content write" ON public.about_content;
CREATE POLICY "Public about content read" ON public.about_content FOR SELECT USING (is_published = true);
CREATE POLICY "Admin about content write" ON public.about_content FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6.10 Contact Inquiries RLS (PUBLIC INSERT ONLY, NO PUBLIC READ/UPDATE/DELETE)
DROP POLICY IF EXISTS "Public contact inquiry insert" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Admin contact inquiries select" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Admin contact inquiries update" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Admin contact inquiries delete" ON public.contact_inquiries;

CREATE POLICY "Public contact inquiry insert" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin contact inquiries select" ON public.contact_inquiries FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin contact inquiries update" ON public.contact_inquiries FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin contact inquiries delete" ON public.contact_inquiries FOR DELETE USING (public.is_admin());

-- 6.11 Trial Bookings RLS (PUBLIC INSERT ONLY, NO PUBLIC READ/UPDATE/DELETE)
DROP POLICY IF EXISTS "Public trial booking insert" ON public.trial_bookings;
DROP POLICY IF EXISTS "Admin trial bookings select" ON public.trial_bookings;
DROP POLICY IF EXISTS "Admin trial bookings update" ON public.trial_bookings;
DROP POLICY IF EXISTS "Admin trial bookings delete" ON public.trial_bookings;

CREATE POLICY "Public trial booking insert" ON public.trial_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin trial bookings select" ON public.trial_bookings FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin trial bookings update" ON public.trial_bookings FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin trial bookings delete" ON public.trial_bookings FOR DELETE USING (public.is_admin());

-- 6.12 SEO Metadata RLS
DROP POLICY IF EXISTS "Public SEO metadata read" ON public.seo_metadata;
DROP POLICY IF EXISTS "Admin SEO metadata write" ON public.seo_metadata;
CREATE POLICY "Public SEO metadata read" ON public.seo_metadata FOR SELECT USING (is_published = true);
CREATE POLICY "Admin SEO metadata write" ON public.seo_metadata FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ----------------------------------------------------------------------------
-- 7. INITIAL SEED DATA
-- ----------------------------------------------------------------------------

-- 7.1 Services Seed
INSERT INTO public.services (name, slug, short_description, detailed_description, icon_name, status, is_featured, display_order, is_published)
VALUES
(
    'Accounting & Finance',
    'accounting-finance',
    'Complete financial management solutions covering bookkeeping, GST/VAT compliance, payroll, and financial reporting.',
    'Our Accounting & Finance division offers end-to-end support for business owners in India and UAE. We handle daily bookkeeping, GST return filing in India, UAE VAT compliance, bank reconciliations, payroll, and accurate periodic financial statements.',
    'Calculator',
    'active',
    true,
    1,
    true
),
(
    'Travel Management',
    'travel-management',
    'Corporate travel planning, flight bookings, visa assistance, and corporate expense tracking.',
    'Smart corporate travel solutions designed to streamline business trips, optimize flight and hotel costs, and ensure fast visa assistance for business expansion across international markets.',
    'Plane',
    'coming_soon',
    false,
    2,
    true
),
(
    'Facility Management',
    'facility-management',
    'Integrated facility operations, office administration support, and building management services.',
    'Professional management of physical office environments, property upkeep, administrative vendor management, and operational maintenance for smooth business workflows.',
    'Building',
    'coming_soon',
    false,
    3,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    detailed_description = EXCLUDED.detailed_description,
    status = EXCLUDED.status;

-- 7.2 Site Settings Seed (CONFIRMED COMPANY INFO ONLY - NO FABRICATED LEGAL NAMES)
INSERT INTO public.site_settings (setting_key, setting_value, description, is_public)
VALUES
(
    'company_info',
    '{
        "name": "Yolfin Group",
        "tagline": "Your Growth. Our Responsibility.",
        "subTagline": "We don''t just manage your business, we help it grow.",
        "email": "yolfingroup@gmail.com",
        "phoneIndia": "+91 95629 75022",
        "phoneUAE": "+971 556646580",
        "address": "Office No. 11/501, Areekode Road, Kondotty, Malappuram, Kerala 673638, India"
    }'::jsonb,
    'Core business contact information',
    true
)
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- 7.3 Why Yolfin Benefit Items Seed
INSERT INTO public.why_yolfin_items (title, description, icon_name, category, display_order, is_active)
VALUES
('1 Month Free Trial', 'Try our business services for one full month. Continue only if you are completely satisfied.', 'Gift', 'why_choose', 1, true),
('100% Data Security', 'Your business data is safe with us under strict confidentiality protocols and security.', 'ShieldCheck', 'why_choose', 2, true),
('Expert & Friendly Team', 'Qualified professionals with dedicated support at every step of your growth.', 'Users', 'why_choose', 3, true),
('Accurate & Timely Reports', 'Clear, error-free financial reports delivered on schedule to make better business decisions.', 'FileBarChart', 'why_choose', 4, true),
('Fast & Reliable Support', 'Quick response through WhatsApp, telephone, and email whenever you need assistance.', 'MessageSquare', 'why_choose', 5, true),
('Long-Term Partnership', 'We build dedicated, long-term business support relationships that scale with your growth.', 'Handshake', 'why_choose', 6, true)
ON CONFLICT DO NOTHING;

-- 7.4 Comparison Items Seed
INSERT INTO public.comparison_items (feature_label, traditional_value, yolfin_value, display_order, is_active)
VALUES
('Initial Onboarding Cost', 'High upfront cost from day one with fixed overheads', 'Start with 1 Month FREE with zero risk', 1, true),
('Dedicated Support', 'Intermittent or shared support with slow response times', 'Dedicated support team via direct channels', 2, true),
('Reporting Timelines', 'Delayed reporting, often after compliance deadlines', 'Timely & accurate periodic reporting', 3, true),
('Operational Process', 'Complex, rigid processes with limited visibility', 'Clear, streamlined process with complete transparency', 4, true)
ON CONFLICT DO NOTHING;

-- 7.5 Initial SEO Metadata Seed
INSERT INTO public.seo_metadata (page_path, title, description, is_published)
VALUES
('/', 'Yolfin Group | Your Growth. Our Responsibility.', 'Professional business support solutions covering Accounting & Finance, Travel Management, and Facility Management across India and UAE.', true),
('/about', 'About Us | Yolfin Group', 'Learn about Yolfin Group''s mission, vision, and team dedicated to simplifying business management in India and UAE.', true),
('/services', 'Our Services | Yolfin Group', 'Explore integrated solutions for Accounting & Finance, Travel Management, and Facility Management.', true),
('/why-us', 'Why Choose Yolfin Group', 'Six strong reasons why growing businesses choose Yolfin Group as their trusted business support partner.', true),
('/contact', 'Contact Us | Yolfin Group', 'Get in touch with Yolfin Group offices in Malappuram, Kerala, India and UAE.', true)
ON CONFLICT (page_path) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;
