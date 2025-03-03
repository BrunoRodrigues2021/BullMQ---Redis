const EmailQueue = require('../config/email-queue');

class EmailController {

    static async sendEmail(req, res) {
        const {emails} = req.body;

        try {
            await EmailQueue.addEmailToQueue(emails);
            return res.status(200).json({message: 'Emails added to queue'});
        } catch (error) {
            return res.status(500).json({error: `Failed to add emails to queue : Error : ${error}`});
        }
    }
}

module.exports = EmailController;