const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/res/uploads/' });
const router = express.Router();

const isApiAuthenticated = require('../middleware/isApiAuthenticated');

const loginGetController = require('../controllers/api/auth/login');
const registerGetController = require('../controllers/api/auth/register');
const usersGetController = require('../controllers/api/users/users');
const productsGetController = require('../controllers/api/products/products');
const productsPostController = require('../controllers/api/products/post');
const messagesDashboardGetController = require('../controllers/api/messages/dashboard/get');
const messagesDetailsGetConroller = require('../controllers/api/messages/details/get');

const loginPostController = require('../controllers/api/auth/login/post');
const registerPostController = require('../controllers/api/auth/register/post');

const newProductPostController = require('../controllers/api/products/newProduct');
const newProductImagePostController = require('../controllers/api/products/newProductImage');
const editProductPostController = require('../controllers/api/edit/editProduct');
const editUserImagePostController = require('../controllers/api/edit/editUserImage');
const editUserPostController = require('../controllers/api/edit/editUser');
const favoritePostController = require('../controllers/api/favorites/addToFavorites');
const messagesDashboardPostController = require('../controllers/api/messages/dashboard/post');
const notificationsPostController = require('../controllers/api/notifications/post');

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
    messagesDashboardGetController
);
router.get(
  '/messages/details',
    isApiAuthenticated,
    messagesDetailsGetConroller
);

router.post(
  '/auth/login',
    isApiAuthenticated,
    loginPostController
);
router.post(
  '/auth/register',
    isApiAuthenticated,
    registerPostController
);

router.post(
  '/products',
    isApiAuthenticated,
    productsPostController
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
router.post(
  '/editUserProfile',
    upload.single('photo'),
    isApiAuthenticated,
    editUserImagePostController
);
router.post(
  '/editUser',
    isApiAuthenticated,
    editUserPostController
);
router.post(
  '/addToFavorite',
    isApiAuthenticated,
    favoritePostController
);
router.post(
  '/newMessage',
    isApiAuthenticated,
    messagesDashboardPostController
);
router.post(
  '/notifications',
    isApiAuthenticated,
    notificationsPostController
);

module.exports = router;
