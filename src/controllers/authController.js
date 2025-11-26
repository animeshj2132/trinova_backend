import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/database.js';

// Register first admin (one-time setup)
export const registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if any admin exists
    const { data: existingAdmins, error: checkError } = await supabase
      .from('admins')
      .select('id')
      .limit(1);

    if (checkError) throw checkError;

    // Only allow registration if no admins exist
    if (existingAdmins && existingAdmins.length > 0) {
      return res.status(403).json({
        success: false,
        message: 'Admin registration is disabled. Please use login.'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create admin
    const { data: admin, error } = await supabase
      .from('admins')
      .insert([
        {
          email,
          password_hash: passwordHash,
          role: 'super_admin'
        }
      ])
      .select('id, email, role, created_at')
      .single();

    if (error) throw error;

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login admin
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, password_hash, role')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await supabase
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current admin
export const getCurrentAdmin = async (req, res, next) => {
  try {
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, role, created_at, last_login')
      .eq('id', req.admin.id)
      .single();

    if (error || !admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      data: { admin }
    });
  } catch (error) {
    next(error);
  }
};

// Change password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    // Get current admin with password
    const { data: admin, error: fetchError } = await supabase
      .from('admins')
      .select('password_hash')
      .eq('id', adminId)
      .single();

    if (fetchError || !admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update password
    const { error: updateError } = await supabase
      .from('admins')
      .update({ password_hash: passwordHash })
      .eq('id', adminId);

    if (updateError) throw updateError;

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

