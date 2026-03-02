const { sendContactEmail } = require('../services/email.service');

/**
 * Submit contact form
 */
exports.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Send email to admin/support team
    await sendContactEmail({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Error submitting contact form. Please try again later.'
    });
  }
};
