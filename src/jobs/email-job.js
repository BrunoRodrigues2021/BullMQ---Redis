const EmailTransporter = require('../config/email-transporter');

class EmailJob {

    async sendEmail(job) {
        const {to, subject, text} = job.data;
        const transporter = EmailTransporter.createTransport();

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
        });

        console.log('Email sent:', info.messageId);
    }
}

module.exports = new EmailJob();
