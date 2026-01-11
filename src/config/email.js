const nodemailer = require('nodemailer');
const config = require('./env');

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: config.EMAIL_PORT === 465,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: config.EMAIL_FROM,
      to,
      subject,
      text,
      html: html || text
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
  transporter
};
