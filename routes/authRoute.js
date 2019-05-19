const express = require('express');
const router = express.Router();

const registerGetController = require('../controllers/auth/register/get');
const loginGetController = require('../controllers/auth/login/get');

const registerPostController = require('../controllers/auth/register/post');
const loginPostController = require('../controllers/auth/login/post');

router.get(
  '/register', 
  registerGetController
);
router.get(
  '/login',
  loginGetController
);

router.post(
  '/register',
  registerPostController
);
router.post(
  '/login',
  loginPostController
);

module.exports = router;
