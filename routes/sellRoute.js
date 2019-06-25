const express = require('express');
const multer = require('multer');

const upload = multer({dest: './public/res/uploads/'});
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const dashboardGetController = require('../controllers/sell/dashboard/get');
const sellNewGetController = require('../controllers/sell/new/get');
const sellDetailsGetController = require('../controllers/sell/details/get');
const sellMessagesGetController = require('../controllers/sell/messages/get');
const sellMessagesDashboardGetController = require('../controllers/sell/messages/dashboardGet');

const sellNewPostController = require('../controllers/sell/new/post');
const sellNewProfilePostController = require('../controllers/sell/new/postPhoto');
const sellDeletePostController = require('../controllers/sell/details/delete');
const sellMarkAsSoldPostController = require('../controllers/sell/details/sold');
const sellMessageDetailsPostController = require('../controllers/sell/messages/post');

router.get(
  '/', 
  isLoggedIn,
  dashboardGetController
);
router.get(
  '/new',
  isLoggedIn,
  sellNewGetController
);
router.get(
  '/details',
  isLoggedIn,
  sellDetailsGetController
);
router.get(
  '/messages',
  isLoggedIn,
  sellMessagesGetController
);
router.get(
  '/messages/dashboard',
  isLoggedIn,
  sellMessagesDashboardGetController
);

router.post(
  '/new/photo',
  upload.single('file'),
  isLoggedIn,
  sellNewProfilePostController
);
router.post(
  '/new',
  isLoggedIn,
  sellNewPostController
);
router.get(
  '/details/delete',
  isLoggedIn,
  sellDeletePostController
);
router.get(
  '/details/sold',
  isLoggedIn,
  sellMarkAsSoldPostController
);
router.post(
  '/messages/details',
  isLoggedIn,
  sellMessageDetailsPostController
);

module.exports = router;
