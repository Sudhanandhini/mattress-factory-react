const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

/**
 * Send welcome email
 */
exports.sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to MATTRESS FACTORY!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to MATTRESS FACTORY!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for signing up! We're excited to have you as part of our community.</p>
          <p>Browse our collection of premium mattresses and enjoy a comfortable shopping experience.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <br>
          <p>Best regards,</p>
          <p>The MATTRESS FACTORY Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

/**
 * Send password reset email
 */
exports.sendPasswordResetEmail = async (email, name, resetUrl) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hi ${name},</p>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; margin: 16px 0;">Reset Password</a>
          <p>This link will expire in 30 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The MATTRESS FACTORY Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

/**
 * Send password changed confirmation email
 */
exports.sendPasswordChangedEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Changed Successfully',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Changed</h2>
          <p>Hi ${name},</p>
          <p>Your password has been successfully changed.</p>
          <p>If you didn't make this change, please contact our support team immediately.</p>
          <br>
          <p>Best regards,</p>
          <p>The MATTRESS FACTORY Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password changed email sent to:', email);
  } catch (error) {
    console.error('Error sending password changed email:', error);
  }
};

/**
 * Send order confirmation email
 */
exports.sendOrderConfirmationEmail = async (email, name, orderNumber, orderDetails) => {
  try {
    const transporter = createTransporter();

    const itemsHtml = orderDetails.items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.productName}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Order Confirmation - #${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Order Confirmed!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your order! Your order #${orderNumber} has been confirmed.</p>
          
          <h3 style="margin-top: 24px;">Order Details:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ddd;">Quantity</th>
                <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 8px; text-align: right; font-weight: bold;">₹${orderDetails.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <p style="margin-top: 24px;">We'll send you another email when your order ships.</p>
          <br>
          <p>Best regards,</p>
          <p>The MATTRESS FACTORY Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

/**
 * Send order shipped email
 */
exports.sendOrderShippedEmail = async (email, name, orderNumber, trackingNumber) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Your Order #${orderNumber} Has Shipped!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Order Has Shipped!</h2>
          <p>Hi ${name},</p>
          <p>Great news! Your order #${orderNumber} has been shipped.</p>
          ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
          <p>You can expect delivery soon.</p>
          <br>
          <p>Best regards,</p>
          <p>The MATTRESS FACTORY Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order shipped email sent to:', email);
  } catch (error) {
    console.error('Error sending order shipped email:', error);
  }
};

/**
 * Send order delivered email
 */
exports.sendOrderDeliveredEmail = async (email, name, orderNumber) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Your Order #${orderNumber} Has Been Delivered!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Order Delivered!</h2>
          <p>Hi ${name},</p>
          <p>Your order #${orderNumber} has been delivered successfully!</p>
          <p>We hope you enjoy your new mattress. If you have any questions or concerns, please don't hesitate to contact us.</p>
          <p>We'd love to hear your feedback. Please consider leaving a review!</p>
          <br>
          <p>Best regards,</p>
          <p>The MATTRESS FACTORY Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order delivered email sent to:', email);
  } catch (error) {
    console.error('Error sending order delivered email:', error);
  }
};

/**
 * Send contact form email
 */
exports.sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    const { firstName, lastName, email, phone, subject, message } = contactData;

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL || 'admin@mattressstore.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border-top: 1px solid #eee; margin: 20px 0;">
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr style="border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            You can reply to this email to respond to the customer.
          </p>
        </div>
      `
    };

    // Send confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'We Received Your Message - MATTRESS FACTORY',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank You for Contacting Us!</h2>
          <p>Hi ${firstName},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your Subject:</strong> ${subject}</p>
          <p>Our support team typically responds within 24 hours during business days.</p>
          <br>
          <p>Best regards,</p>
          <p>The MATTRESS FACTORY Team</p>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log('Contact form emails sent to admin and customer:', email);
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
};

module.exports = exports;
