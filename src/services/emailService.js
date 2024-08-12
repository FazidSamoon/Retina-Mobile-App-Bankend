import nodemailer from "nodemailer";

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  auth: {
    user: "retinacareplus@gmail.com",
    pass: "upxu rohe zgpu hoez",
  },
});

/**
 * Sends an email with the specified options.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} template - The email body content.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sendEmail = async ({ to, subject, template }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'fazidsamoon331@gmail.com',
    subject,
    html: template,
  };

  return transporter.sendMail(mailOptions);
};
