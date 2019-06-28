const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('../middleware/isLoggedin');

const editUserGetController = require('../controllers/edit/user/get');

const editProductPostController = require('../controllers/edit/products/post');
const editProductPhotoPostController = require('../controllers/edit/products/postPhoto');
const editUserPostController = require('../controllers/edit/user/post');
const editUserPostPasswordController = require('../controllers/edit/user/postPassword');
const editUserPhotoPostController = require('../controllers/edit/user/postPhoto');

router.get(
  '/user',
  isLoggedIn,
  editUserGetController
);

router.post(
  '/product',
  isLoggedIn,
  editProductPostController
);
router.post(
  '/product/photo',
  upload.single('picture'),
  isLoggedIn,
  editProductPhotoPostController
);
router.post(
  '/user',
  isLoggedIn,
  editUserPostController
);
router.post(
  '/user/password',
  isLoggedIn,
  editUserPostPasswordController
);
router.post(
  '/user/photo',
  upload.single('file'),
  isLoggedIn,
  editUserPhotoPostController
);

module.exports = router;
