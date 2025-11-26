export const ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

export const INQUIRY_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  CLOSED: 'closed'
};

export const CONTENT_SECTIONS = {
  HOME: 'home',
  SERVICES: 'services',
  ABOUT: 'about',
  CONTACT: 'contact',
  FOOTER: 'footer'
};

export const CONTENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  JSON: 'json',
  HTML: 'html'
};

export const MEDIA_CATEGORIES = {
  HERO: 'hero',
  SERVICE: 'service',
  TESTIMONIAL: 'testimonial',
  GENERAL: 'general',
  LOGO: 'logo'
};

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 104857600; // 100MB default (for videos)

