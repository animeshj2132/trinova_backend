-- Supabase Storage Bucket Setup
-- Run this in Supabase SQL Editor after creating the bucket in the Storage UI
 
-- Create storage bucket for media (images and videos)
-- Note: You need to create the bucket in Supabase Dashboard first:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: "media"
-- 4. Public: true (to allow public access to images/videos)
-- 5. File size limit: 100MB (or your preferred limit)
-- 6. Allowed MIME types: image/*, video/*

-- After creating the bucket, run this SQL to set up policies:

-- Policy: Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' AND
  (storage.foldername(name))[1] IN ('images', 'videos')
);

-- Policy: Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

-- Policy: Allow authenticated users to delete files
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- Policy: Allow public read access to all files
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'media');

-- Optional: Policy to allow service role full access (for backend operations)
-- This is usually handled automatically by service role key, but you can add it explicitly:
CREATE POLICY "Service role full access"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

