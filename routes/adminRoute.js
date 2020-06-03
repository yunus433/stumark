const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const loginGetController = require('../controllers/admin/auth/get');
const indexGetController = require('../controllers/admin/index/get');
const schoolsGetController = require('../controllers/admin/schools/index/get');
const schoolsDetailsGetController = require('../controllers/admin/schools/details/get');
const schooolsDeleteGetController = require('../controllers/admin/schools/delete/get');
const usersGetController = require('../controllers/admin/users/index/get');
const usersDeleteGetController = require('../controllers/admin/users/delete/get');

const loginPostController = require('../controllers/admin/auth/post');
const indexPostController = require('../controllers/admin/index/post');
const schoolsPostController = require('../controllers/admin/schools/index/post');
const schoolsDetailsPostController = require('../controllers/admin/schools/details/post');
const userPostController = require('../controllers/admin/users/index/post');

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

module.exports = router;
