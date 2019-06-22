const express = require('express');
const router = express.Router();

const registerGetController = require('../controllers/auth/register/get');
const loginGetController = require('../controllers/auth/login/get');
const agreement1GetController = require('../controllers/auth/agreement/agreement1Get');
const agreement2GetController = require('../controllers/auth/agreement/agreement2Get');

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
router.get(
  '/agreement/one',
  agreement1GetController
);
router.get(
  '/agreement/two',
  agreement2GetController
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
