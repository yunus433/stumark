const express = require('express');
const multer = require('multer');

const upload = multer({
  dest: './public/res/uploads/',
  limits: { fieldSize: 25 * 1024 * 1024 }
});
const router = express.Router();

const isApiAuthenticated = require('../middleware/isApiAuthenticated');

const loginGetController = require('../controllers/api/login');
const registerGetController = require('../controllers/api/register');
const verifyGetController = require('../controllers/api/verify');
const usersGetController = require('../controllers/api/users');
const productsGetController = require('../controllers/api/products');
const messagesGetController = require('../controllers/api/messages');

const newProductPostController = require('../controllers/api/newProduct');
const newProductImagePostController = require('../controllers/api/newProductImage');
const editProductPostController = require('../controllers/api/editProduct');

router.get(
  '/login',
  isApiAuthenticated,
  loginGetController
);
router.get(
  '/register',
  isApiAuthenticated,
  registerGetController
);
router.get(
  '/verify',
  isApiAuthenticated,
  verifyGetController
);
router.get(
  '/users',
  isApiAuthenticated,
  usersGetController
);
router.get(
  '/products',
  isApiAuthenticated,
  productsGetController
);
router.get(
  '/messages',
  isApiAuthenticated,
  messagesGetController
);

router.post(
  '/newProductImage',
  upload.single('photo'),
  isApiAuthenticated,
  newProductImagePostController
);
router.post(
  '/newProduct',
  isApiAuthenticated,
  newProductPostController
);
router.post(
  '/editProduct',
  isApiAuthenticated,
  editProductPostController
);

module.exports = router;
