const express = require('express');
const router = express.Router();

const loginGetController = require('../controllers/api/login');

router.get(
  '/login',
  loginGetController
);

module.exports = router;
