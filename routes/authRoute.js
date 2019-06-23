const express = require('express');
const router = express.Router();

const registerGetController = require('../controllers/auth/register/get');
const loginGetController = require('../controllers/auth/login/get');
const verifyGetController = require('../controllers/auth/verify/get');
const agreement1GetController = require('../controllers/auth/agreement/agreement1Get');
const agreement2GetController = require('../controllers/auth/agreement/agreement2Get');

const registerPostController = require('../controllers/auth/register/post');
const loginPostController = require('../controllers/auth/login/post');
const verifyPostController = require('../controllers/auth/verify/post');
const verifyNewPostController = require('../controllers/auth/verify/newPost');

router.get(
  '/register', 
  registerGetController
);
router.get(
  '/login',
  loginGetController
);
router.get(
  '/verify',
  verifyGetController
);
router.get(
  '/agreement/one',
  agreement1GetController
);
router.get(
  '/agreement/two',
  agreement2GetController
);
router.get(
  '/verify/post',
  verifyPostController
);

router.post(
  '/register',
  registerPostController
);
router.post(
  '/login',
  loginPostController
);
router.post(
  '/verify/new',
  verifyNewPostController
);

module.exports = router;
