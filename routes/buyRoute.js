const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const dashboardGetController = require('../controllers/buy/dashboard/get');
const messagesGetController = require('../controllers/buy/messages/get');

const messagesPostController = require('../controllers/buy/messages/post');

router.get(
  '/', 
  isLoggedIn,
  dashboardGetController
);
router.get(
  '/messages',
  isLoggedIn,
  messagesGetController
);

router.post(
  '/messages',
  isLoggedIn,
  messagesPostController
);

module.exports = router;
