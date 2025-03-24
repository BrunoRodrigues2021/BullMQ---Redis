const request = require('supertest');
const {Worker} = require('bullmq');
const app = require('../app');
const RedisConfig = require('../config/redis-config');

const emailWorker = new Worker('emailQueue', require('../workers/email/jobs/email-job').sendEmail, {
    connection: RedisConfig.connection
});

describe('POST /api/send-email', () => {
    jest.setTimeout(100000);

    it('should send emails and process them through the queue', async () => {
        const emails = [
            {to: 'user1@example.com', subject: 'Test 1', text: 'Test email 1.'},
            {to: 'user2@example.com', subject: 'Test 2', text: 'Test email 2.'},
        ];

        const response = await request(app)
            .post('/api-email/send-email')
            .send({emails});

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Email job added to queue');

        await new Promise((resolve) => {
            emailWorker.on('completed', (job) => {
                console.log(`Job ${job.id} completed`);
                resolve();
            });

            emailWorker.on('failed', (job, err) => {
                console.error(`Job ${job.id} failed with error: ${err.message}`);
                resolve();
            });
        });
    });

    it('should return 400 for invalid email data', async () => {
        const response = await request(app)
            .post('/api-email/send-email')
            .send({emails: 'invalid-email'});

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to add job to queue : Error : Error: Provided data is not an array of emails');
    });
});
