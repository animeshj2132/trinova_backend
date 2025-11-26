import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️  Email configuration not found. Email notifications will be disabled.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();

// Send email notification for new contact inquiry
export const sendInquiryNotification = async (inquiry) => {
  if (!transporter) {
    console.log('Email service not configured. Skipping notification.');
    return false;
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;

  try {
    const mailOptions = {
      from: `"Trinova AI Website" <${process.env.SMTP_USER}>`,
      to: notificationEmail,
      subject: `New Contact Form Inquiry from ${inquiry.firstName} ${inquiry.lastName}`,
      html: `
        <h2>New Contact Form Inquiry</h2>
        <p><strong>Name:</strong> ${inquiry.firstName} ${inquiry.lastName}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${inquiry.company || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${inquiry.serviceInterest || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${inquiry.message}</p>
        <hr>
        <p><small>Submitted at: ${new Date(inquiry.submittedAt).toLocaleString()}</small></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Inquiry notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending inquiry notification email:', error);
    return false;
  }
};

// Send auto-response to customer
export const sendAutoResponse = async (inquiry) => {
  if (!transporter) {
    return false;
  }

  try {
    const mailOptions = {
      from: `"Trinova AI Technologies" <${process.env.SMTP_USER}>`,
      to: inquiry.email,
      subject: 'Thank you for contacting Trinova AI Technologies',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${inquiry.firstName},</p>
        <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
        <p><strong>Your inquiry details:</strong></p>
        <ul>
          <li><strong>Service Interest:</strong> ${inquiry.serviceInterest || 'General Inquiry'}</li>
          <li><strong>Message:</strong> ${inquiry.message}</li>
        </ul>
        <p>If you have any urgent questions, please feel free to contact us directly at:</p>
        <ul>
          <li>Phone: +91 83106 94003</li>
          <li>Email: technical@trinovaaitech.com</li>
        </ul>
        <p>Best regards,<br>Trinova AI Technologies Team</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Auto-response email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending auto-response email:', error);
    return false;
  }
};

export default transporter;

