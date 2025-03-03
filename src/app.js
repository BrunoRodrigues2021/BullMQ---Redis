const express = require('express');
const routes = require('./routes/email-routes');
const {serverAdapter} = require('./config/bull-panel');

const app = express();

app.use(express.json());

app.use('/api-email', routes);
app.use('/api-email/admin/queues', serverAdapter.getRouter());

module.exports = app;
