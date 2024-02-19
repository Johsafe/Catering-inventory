const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.SECURE),
  requireTLS: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
//send a welcome 
const sendWelcomeEmail = async(email, name) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Welcome to Catering",
    html: `<h1>Welcome to Catering </h1>
            <h2>Hello ${name}</h2>
            <p>Thanks for accepting to work with us.We're excited to have you on board</p>
            </div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending welcome email:", error);
    } else {
      console.log("Welcome email sent:", info.response);
    }
  });
  };

  module.exports = {sendWelcomeEmail}