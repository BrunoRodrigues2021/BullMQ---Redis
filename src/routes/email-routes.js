const {Router} = require('express');
const EmailController = require('../controllers/email-controller');

const routes = Router();

routes.post('/send-email', EmailController.sendEmail);

module.exports = routes;
