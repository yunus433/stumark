const express = require('express');
const router = express.Router();

const registerGetController = require('../controllers/auth/register/get');
const loginGetController = require('../controllers/auth/login/get');
const agreement1GetController = require('../controllers/auth/agreement/agreement1Get');
const agreement2GetController = require('../controllers/auth/agreement/agreement2Get');
const resetPasswordGetController = require('../controllers/auth/resetPassword/get');
const resetPasswordGetEmailController = require('../controllers/auth/resetPassword/resetGet');

const registerPostController = require('../controllers/auth/register/post');
const loginPostController = require('../controllers/auth/login/post');
const logoutPostController = require('../controllers/auth/logout/post');
const resetPasswordPostController = require('../controllers/auth/resetPassword/resetPost');
const resetPasswordPostEmailController = require('../controllers/auth/resetPassword/sendMailPost');

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
router.get(
  '/reset',
  resetPasswordGetController
);
router.get(
  '/reset/post',
  resetPasswordGetEmailController
);

router.post(
  '/register',
  registerPostController
);
router.post(
  '/login',
  loginPostController
);
router.get(
  '/logout',
  logoutPostController
);
router.post(
  '/reset',
  resetPasswordPostController
);
router.post(
  '/reset/send',
  resetPasswordPostEmailController
);

module.exports = router;
