const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const loginGetController = require('../controllers/admin/auth/get');
const indexGetController = require('../controllers/admin/index/get');
const schoolsGetController = require('../controllers/admin/schools/index/get');
const schoolsDetailsGetController = require('../controllers/admin/schools/details/get');
const schooolsDeleteGetController = require('../controllers/admin/schools/delete/get');
const usersGetController = require('../controllers/admin/users/index/get');
const usersDetailsGetController = require('../controllers/admin/users/details/get');
const usersDeleteGetController = require('../controllers/admin/users/delete/get');

const loginPostController = require('../controllers/admin/auth/post');
const indexPostController = require('../controllers/admin/index/post');
const schoolsPostController = require('../controllers/admin/schools/index/post');
const schoolsDetailsPostController = require('../controllers/admin/schools/details/post');
const usersPostController = require('../controllers/admin/users/index/post');
const usersDetailsPostController = require('../controllers/admin/users/details/post');

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
  '/schools',
    isAdmin,
    schoolsGetController
);
router.get(
  '/schools/details',
    isAdmin,
    schoolsDetailsGetController
);
router.get(
  '/schools/delete',
    isAdmin,
    schooolsDeleteGetController
);
router.get(
  '/users',
    isAdmin,
    usersGetController
);
router.get(
  '/users/details',
    isAdmin,
    usersDetailsGetController
);
router.get(
  '/users/delete',
    isAdmin,
    usersDeleteGetController
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
  '/schools',
    isAdmin,
    schoolsPostController
);
router.post(
  '/schools/details',
    isAdmin,
    schoolsDetailsPostController
);
router.post(
  '/users',
    isAdmin,
    usersPostController
);
router.post(
  '/users/details',
    isAdmin,
    usersDetailsPostController
);

module.exports = router;
