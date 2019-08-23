const express = require('express');
const router = express.Router();

const dashboardGetController = require('../controllers/buy/dashboard/get');
const detailsGetController = require('../controllers/buy/details/get');

router.get(
  '/', 
  dashboardGetController
);
router.get(
  '/details',
  detailsGetController
);

module.exports = router;
