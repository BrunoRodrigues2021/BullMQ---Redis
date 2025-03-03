const {Queue} = require('bullmq');
const {createBullBoard} = require('@bull-board/api');
const {BullMQAdapter} = require('@bull-board/api/bullMQAdapter');
const {ExpressAdapter} = require('@bull-board/express');
const RedisConfig = require('./redis-config');

const queuesList = ['emailQueue'];

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/api-email/admin/queues');

const queues = queuesList
    .map((queueName) => new Queue(queueName, {connection: RedisConfig.connection}))
    .map((queue) => new BullMQAdapter(queue));

const {addQueue, removeQueue, setQueues, replaceQueues} = createBullBoard({
    queues,
    serverAdapter: serverAdapter,
});

module.exports = {serverAdapter, queues, addQueue, removeQueue, setQueues, replaceQueues};