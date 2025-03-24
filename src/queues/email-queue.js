const {Queue} = require('bullmq');
const RedisConfig = require('../config/redis-config');

class EmailQueue {

    constructor() {
        this.queue = new Queue('emailQueue', {
            connection: RedisConfig.connection,
        });
    }

    async addEmailToQueue(emails) {
        console.log('Processing emails:', emails);

        if (Array.isArray(emails)) {
            for (const emailData of emails) {
                console.log('Adding email to queue:', emailData);

                await this.queue.add('emailTopic', emailData, {
                    attempts: 3,
                    backoff: 5000,
                });
            }
        } else {
            throw new Error('Provided data is not an array of emails');
        }
    }
}

module.exports = new EmailQueue();