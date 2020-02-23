const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const dashboardGetController = require('../controllers/messages/dashboard/get');
const buyGetController = require('../controllers/messages/buy/get');
const sellGetController = require('../controllers/messages/sell/get');

const buyPostController = require('../controllers/messages/buy/post');

router.get(
  '/dashboard',
  isLoggedIn,
  dashboardGetController
);
router.get(
  '/buy', 
  isLoggedIn,
  buyGetController
);
router.get(
  '/sell',
  isLoggedIn,
  sellGetController
);

router.post(
  '/buy',
  isLoggedIn,
  buyPostController
);

module.exports = router;
