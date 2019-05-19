const express = require('express');
const multer = require('multer');

const upload = multer({dest: './public/res/uploads/'});
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const dashboardGetController = require('../controllers/sell/dashboard/get');
const sellNewGetController = require('../controllers/sell/new/get');
const sellMessagesGetController = require('../controllers/sell/messages/get');
const sellMessageDetailsGetController = require('../controllers/sell/messages/details/get');

const sellNewPostController = require('../controllers/sell/new/post');
const sellNewProfilePostController = require('../controllers/sell/new/postPhoto');
const sellMessageDetailsPostController = require('../controllers/sell/messages/details/post');

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
  '/messages',
  isLoggedIn,
  sellMessagesGetController
);
router.get(
  '/messages/details',
  isLoggedIn,
  sellMessageDetailsGetController
);

router.post(
  '/new/photo',
  upload.single('image'),
  isLoggedIn,
  sellNewProfilePostController
);
router.post(
  '/new',
  isLoggedIn,
  sellNewPostController
);
router.post(
  '/messages/details',
  isLoggedIn,
  sellMessageDetailsPostController
);

module.exports = router;
