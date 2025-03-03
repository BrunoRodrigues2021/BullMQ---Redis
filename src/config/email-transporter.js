require('dotenv').config();

const nodemailer = require('nodemailer');

class EmailTransporter {

    createTransport() {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
    }
}

module.exports = new EmailTransporter();
