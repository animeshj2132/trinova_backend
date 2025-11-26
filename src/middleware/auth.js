import jwt from 'jsonwebtoken';
import { supabase } from '../config/database.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided. Access denied.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify admin still exists in database
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, role')
      .eq('id', decoded.id)
      .single();

    if (error || !admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. Admin not found.' 
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Authentication error.', 
      error: error.message 
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

