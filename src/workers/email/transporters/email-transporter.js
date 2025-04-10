require('dotenv').config({path: __dirname + '/../../../../.env'});

const nodemailer = require('nodemailer');

class EmailTransporter {

    createTransport() {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            tls : {
                rejectUnauthorized: false,
            }
            // auth: {
            //     user: process.env.EMAIL_USER,
            //     pass: process.env.EMAIL_PASS,
            // }
        });
    }
}

module.exports = new EmailTransporter();
