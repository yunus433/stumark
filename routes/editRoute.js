const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('../middleware/isLoggedin');

const editProductGetController = require('../controllers/edit/products/get');
const editUserGetController = require('../controllers/edit/user/get');

const editProductPostController = require('../controllers/edit/products/post');
const editProductPhotoPostController = require('../controllers/edit/products/postPhoto');

router.get(
  '/product', 
  isLoggedIn,
  editProductGetController
);
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
module.exports = router;
