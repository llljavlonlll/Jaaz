const nodemailer = require("nodemailer");
const credentials = require("../keys/email-transporter-keys");

// Login to your email account
// const transporter = nodemailer.createTransport(credentials);

module.exports = transporter;
