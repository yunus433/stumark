const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const dashboardGetController = require('../controllers/messages/dashboard/get');
const detailsGetController = require('../controllers/messages/details/get');

const dashboardPostController = require('../controllers/messages/dashboard/post');

router.get(
  '/',
    isLoggedIn,
    dashboardGetController
);
router.get(
  '/details', 
    isLoggedIn,
    detailsGetController
);

router.post(
  '/',
    isLoggedIn,
    dashboardPostController
);

module.exports = router;
