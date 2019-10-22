const nodemailer = require("nodemailer");
const credentials = require("../keys/email-transporter-keys");

const transporter = nodemailer.createTransport(credentials);

module.exports = transporter;
