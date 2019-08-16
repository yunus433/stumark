const express = require('express');
const router = express.Router();

const isApiAuthenticated = require('../middleware/isApiAuthenticated');

const loginGetController = require('../controllers/api/login');
const registerGetController = require('../controllers/api/register');
const usersGetController = require('../controllers/api/users');
const productsGetController = require('../controllers/api/products');
const messagesGetController = require('../controllers/api/messages');

const newProductPostController = require('../controllers/api/newProduct');

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
  '/newProduct',
  isApiAuthenticated,
  newProductPostController
);

module.exports = router;
