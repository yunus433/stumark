const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const dashboardGetController = require('../controllers/buy/dashboard/get');
const detailsGetController = require('../controllers/buy/details/get');

const detailsPostController = require('../controllers/buy/details/post');

router.get(
  '/', 
  dashboardGetController
);
router.get(
  '/details',
  isLoggedIn,
  detailsGetController
);

router.post(
  '/details',
  isLoggedIn,
  detailsPostController
);

module.exports = router;
