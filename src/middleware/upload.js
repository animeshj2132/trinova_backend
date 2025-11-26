import multer from 'multer';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from '../config/constants.js';

// Allowed video types
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

// Configure storage - use memory storage for Supabase
const storage = multer.memoryStorage();

// File filter - allow images and videos
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Only images and videos are allowed.`), false);
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: fileFilter
});

// Single image upload middleware
export const uploadSingle = upload.single('image');

// Multiple images upload middleware
export const uploadMultiple = upload.array('images', 10);

// Error handler for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 files allowed.'
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Upload error: ' + err.message
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

