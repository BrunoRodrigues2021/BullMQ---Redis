const {Worker} = require('bullmq');
const RedisConfig = require('../../config/redis-config');
const EmailJob = require('./jobs/email-job');

class EmailWorker {

    constructor() {
        this.worker = new Worker('emailQueue', EmailJob.sendEmail, {
            connection: RedisConfig.connection,
        });

        this.worker.on('completed', this.handleCompleted);
        this.worker.on('failed', this.handleFailed);
    }

    handleCompleted(job) {
        console.log(`Job ${job.id} completed`);
    }

    handleFailed(job, err) {
        console.error(`Job ${job.id} failed with error: ${err.message}`);
    }
}

module.exports = new EmailWorker();
