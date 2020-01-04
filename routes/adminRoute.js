const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const loginGetController = require('../controllers/admin/auth/get');
const indexGetController = require('../controllers/admin/index/get');
const notificationGetController = require('../controllers/admin/notification/get');

const loginPostController = require('../controllers/admin/auth/post');
const indexPostController = require('../controllers/admin/index/post');
const notificationPostController = require('../controllers/admin/notification/post');

router.get(
  '/login',
  loginGetController
);
router.get(
  '/',
  isAdmin,
  indexGetController
);
router.get(
  '/notification',
  isAdmin,
  notificationGetController
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
router.post(
  '/notification',
  isAdmin,
  notificationPostController
);

module.exports = router;
