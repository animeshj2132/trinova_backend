-- Add Blogs Table for Blog Posts Management
-- Run this in your Supabase SQL Editor

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    excerpt TEXT, -- Short description for card view
    category VARCHAR(100), -- Category tag (e.g., "Artificial Intelligence", "Sustainability")
    card_image TEXT, -- Image URL for card/listing view
    cover_image TEXT, -- Image URL for article detail page
    read_time VARCHAR(50) DEFAULT '5 min read', -- e.g., "5 min read"
    published_date DATE, -- Publication date
    full_content JSONB, -- Rich content structure with headings, paragraphs, blockquotes, lists
    key_points JSONB, -- Array of key point strings
    tags JSONB, -- Array of tag strings
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(is_published, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_order ON blogs(order_index, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);

-- Apply updated_at trigger
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

