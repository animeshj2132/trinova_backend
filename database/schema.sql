-- Trinova AI Backend Database Schema for Supabase (PostgreSQL)
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Website Content Table (for dynamic content management)
CREATE TABLE IF NOT EXISTS website_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section VARCHAR(100) NOT NULL, -- 'home', 'services', 'about', 'contact', etc.
    content_key VARCHAR(255) NOT NULL, -- unique key for the content piece
    content_value TEXT, -- text content or JSON string
    content_type VARCHAR(50) DEFAULT 'text', -- 'text', 'image', 'json', 'html'
    image_url TEXT, -- if content_type is 'image'
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES admins(id),
    UNIQUE(section, content_key)
);

-- Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    highlights JSONB, -- array of highlight strings
    description TEXT,
    sub_description TEXT,
    media_url TEXT NOT NULL, -- can be image or video URL
    media_type VARCHAR(20) DEFAULT 'image', -- 'image' or 'video'
    primary_cta_label VARCHAR(255),
    primary_cta_icon VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100), -- icon class name
    category VARCHAR(100),
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customer Inquiries Table (from contact form)
CREATE TABLE IF NOT EXISTS customer_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_interest VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'closed'
    is_read BOOLEAN DEFAULT false,
    admin_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    contacted_by UUID REFERENCES admins(id)
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    designation VARCHAR(255),
    message TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media/Images Table
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT, -- in bytes
    mime_type VARCHAR(100),
    category VARCHAR(100), -- 'hero', 'service', 'testimonial', 'general'
    uploaded_by UUID REFERENCES admins(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site Configuration Table
CREATE TABLE IF NOT EXISTS site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(255) UNIQUE NOT NULL,
    config_value TEXT, -- JSON string for complex values
    config_type VARCHAR(50) DEFAULT 'text', -- 'text', 'json', 'image'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES admins(id)
);

-- Insert default site configuration
INSERT INTO site_config (config_key, config_value, config_type) VALUES
    ('site_name', 'Trinova AI', 'text'),
    ('logo_url', '/logo.png', 'image'),
    ('phone', '+91 83106 94003', 'text'),
    ('email', 'technical@trinovaaitech.com', 'text'),
    ('address', 'No-1461, 2nd floor, 14th cross road, Ananth Nagar phase2, Electronic City, Bangalore - 560100', 'text'),
    ('social_links', '{"linkedin": "#", "instagram": "#", "facebook": "#"}', 'json')
ON CONFLICT (config_key) DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_website_content_section ON website_content(section);
CREATE INDEX IF NOT EXISTS idx_website_content_key ON website_content(content_key);
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON hero_slides(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_customer_inquiries_status ON customer_inquiries(status, is_read);
CREATE INDEX IF NOT EXISTS idx_customer_inquiries_submitted ON customer_inquiries(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_content_updated_at BEFORE UPDATE ON website_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON hero_slides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_inquiries_updated_at BEFORE UPDATE ON customer_inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

