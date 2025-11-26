# Trinova AI Backend API

Backend API for Trinova AI Technologies website with Content Management System (CMS).

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase (PostgreSQL)** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email notifications

## Features

- ✅ Admin authentication (JWT)
- ✅ Content Management System (CMS)
- ✅ Hero slides management
- ✅ Services management
- ✅ Testimonials management
- ✅ Customer inquiries handling
- ✅ Image upload and management
- ✅ Site configuration management
- ✅ Email notifications

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- Supabase account and project
- npm or yarn

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `database/schema.sql`
4. This will create all necessary tables and indexes

### 4. Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration:
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_ANON_KEY` - Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
   - `JWT_SECRET` - A strong secret key for JWT tokens
   - `ADMIN_EMAIL` - Initial admin email
   - `ADMIN_PASSWORD` - Initial admin password
   - `CLIENT_URL` - Frontend URL (for CORS)
   - Email configuration (optional, for notifications)

### 5. Run the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register first admin (one-time)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (protected)
- `PUT /api/auth/change-password` - Change password (protected)

### Contact Form
- `POST /api/contact` - Submit contact form (public)

### Customer Inquiries (Admin)
- `GET /api/inquiries/admin` - Get all inquiries
- `GET /api/inquiries/admin/:id` - Get single inquiry
- `PUT /api/inquiries/admin/:id` - Update inquiry
- `DELETE /api/inquiries/admin/:id` - Delete inquiry
- `GET /api/inquiries/admin/export/csv` - Export to CSV

### Hero Slides
- `GET /api/hero-slides` - Get active slides (public)
- `GET /api/hero-slides/admin` - Get all slides (admin)
- `POST /api/hero-slides/admin` - Create slide (admin)
- `PUT /api/hero-slides/admin/:id` - Update slide (admin)
- `DELETE /api/hero-slides/admin/:id` - Delete slide (admin)
- `PUT /api/hero-slides/admin/reorder` - Reorder slides (admin)

### Services
- `GET /api/services` - Get active services (public)
- `GET /api/services/admin` - Get all services (admin)
- `POST /api/services/admin` - Create service (admin)
- `PUT /api/services/admin/:id` - Update service (admin)
- `DELETE /api/services/admin/:id` - Delete service (admin)

### Testimonials
- `GET /api/testimonials` - Get published testimonials (public)
- `GET /api/testimonials/admin` - Get all testimonials (admin)
- `POST /api/testimonials/admin` - Create testimonial (admin)
- `PUT /api/testimonials/admin/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/admin/:id` - Delete testimonial (admin)

### Image Upload
- `GET /api/media/:filename` - Serve image (public)
- `POST /api/upload/admin` - Upload single image (admin)
- `POST /api/upload/admin/multiple` - Upload multiple images (admin)
- `GET /api/upload/admin/media` - Get all media (admin)
- `DELETE /api/upload/admin/media/:id` - Delete media (admin)

### Site Configuration
- `GET /api/site-config` - Get site config (public)
- `PUT /api/site-config/admin` - Update site config (admin)

### Content Management
- `GET /api/content` - Get all content (public)
- `GET /api/content/:section` - Get content by section (public)
- `POST /api/content/admin` - Create content (admin)
- `PUT /api/content/admin/:id` - Update content (admin)
- `DELETE /api/content/admin/:id` - Delete content (admin)

### Health Check
- `GET /api/health` - API health check

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## File Structure

```
trinova_backend/
├── database/
│   └── schema.sql          # Database schema
├── src/
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── app.js              # Express app setup
├── uploads/                # Uploaded files (gitignored)
├── .env                    # Environment variables
├── package.json
├── server.js               # Server entry point
└── README.md
```

## Development

### Environment Variables

See `.env.example` for all available environment variables.

### Database Migrations

Run the SQL schema in Supabase SQL Editor to set up the database.

### Testing

API endpoints can be tested using:
- Postman
- cURL
- Any HTTP client

Example login request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trinovaaitech.com","password":"yourpassword"}'
```

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS origins
4. Set up proper file storage (consider cloud storage)
5. Use environment variables for all sensitive data
6. Set up proper logging and monitoring

## Security Notes

- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days (configurable)
- Rate limiting is enabled on all routes
- File uploads are validated and restricted
- CORS is configured for specific origins
- Helmet.js is used for security headers

## Support

For issues or questions, contact the development team.

