import { supabase } from '../config/database.js';
import { sendInquiryNotification, sendAutoResponse } from '../utils/emailService.js';
import { INQUIRY_STATUS } from '../config/constants.js';

// Submit contact form (public)
export const submitInquiry = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      message
    } = req.body;

    // Insert inquiry
    const { data: inquiry, error } = await supabase
      .from('customer_inquiries')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phone || null,
          company: company || null,
          service_interest: service || null,
          message,
          status: INQUIRY_STATUS.NEW,
          is_read: false
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Send email notifications (async, don't wait)
    sendInquiryNotification(inquiry).catch(console.error);
    sendAutoResponse(inquiry).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry. We will get back to you soon!',
      data: { inquiry: { id: inquiry.id } }
    });
  } catch (error) {
    next(error);
  }
};

// Get all inquiries (admin)
export const getAllInquiries = async (req, res, next) => {
  try {
    const { status, isRead, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = supabase
      .from('customer_inquiries')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    if (isRead !== undefined) {
      query = query.eq('is_read', isRead === 'true');
    }

    // Apply pagination
    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: inquiries, error, count } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: {
        inquiries,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single inquiry (admin)
export const getInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: inquiry, error } = await supabase
      .from('customer_inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Mark as read if not already read
    if (!inquiry.is_read) {
      await supabase
        .from('customer_inquiries')
        .update({ is_read: true })
        .eq('id', id);
    }

    res.json({
      success: true,
      data: { inquiry }
    });
  } catch (error) {
    next(error);
  }
};

// Update inquiry (admin)
export const updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, isRead } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.admin_notes = adminNotes;
    if (isRead !== undefined) updateData.is_read = isRead;
    updateData.contacted_by = req.admin.id;

    const { data: inquiry, error } = await supabase
      .from('customer_inquiries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: { inquiry }
    });
  } catch (error) {
    next(error);
  }
};

// Delete inquiry (admin)
export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('customer_inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Export inquiries to CSV (admin)
export const exportInquiries = async (req, res, next) => {
  try {
    const { data: inquiries, error } = await supabase
      .from('customer_inquiries')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    // Convert to CSV
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Status', 'Submitted At'];
    const rows = inquiries.map(inquiry => [
      inquiry.id,
      inquiry.first_name,
      inquiry.last_name,
      inquiry.email,
      inquiry.phone || '',
      inquiry.company || '',
      inquiry.service_interest || '',
      `"${inquiry.message.replace(/"/g, '""')}"`,
      inquiry.status,
      new Date(inquiry.submitted_at).toLocaleString()
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=inquiries-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

