const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const loginGetController = require('../controllers/admin/auth/get');
const indexGetController = require('../controllers/admin/index/get');

const loginPostController = require('../controllers/admin/auth/post');
const indexPostController = require('../controllers/admin/index/post');

router.get(
  '/login',
  loginGetController
);
router.get(
  '/',
  isAdmin,
  indexGetController
);

router.post(
  '/login',
  loginPostController
);
router.get(
  '/updateVersion',
  isAdmin,
  indexPostController
);

module.exports = router;
