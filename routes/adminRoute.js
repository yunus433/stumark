const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({dest: './public/res/uploads/'});

const isAdmin = require('../middleware/isAdmin');

const loginGetController = require('../controllers/admin/auth/get');
const indexGetController = require('../controllers/admin/index/get');
const schoolsGetController = require('../controllers/admin/schools/index/get');
const schoolsDetailsGetController = require('../controllers/admin/schools/details/get');
const schooolsDeleteGetController = require('../controllers/admin/schools/delete/get');
const usersGetController = require('../controllers/admin/users/index/get');
const usersDetailsGetController = require('../controllers/admin/users/details/get');
const usersDeleteGetController = require('../controllers/admin/users/delete/get');
const productsGetController = require('../controllers/admin/products/index/get');
const productsDetailsGetController = require('../controllers/admin/products/details/get');
const productsDeleteGetController = require('../controllers/admin/products/delete/get');
const campaignsGetController = require('../controllers/admin/campaigns/index/get');
const campaignsDetailsGetController = require('../controllers/admin/campaigns/details/get');
const campaignsDeleteGetController = require('../controllers/admin/campaigns/delete/get');

const loginPostController = require('../controllers/admin/auth/post');
const indexPostController = require('../controllers/admin/index/post');
const schoolsPostController = require('../controllers/admin/schools/index/post');
const schoolsDetailsPostController = require('../controllers/admin/schools/details/post');
const usersPostController = require('../controllers/admin/users/index/post');
const usersDetailsPostController = require('../controllers/admin/users/details/post');
const productsDetailsPostController = require('../controllers/admin/products/details/post');
const campaignsPostController = require('../controllers/admin/campaigns/index/post');
const campaignsDetailsPostController = require('../controllers/admin/campaigns/details/post');
const campaignsEndPostController = require('../controllers/admin/campaigns/end/post');

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
router.get(
  '/products',
    isAdmin,
    productsGetController
);
router.get(
  '/products/details',
    isAdmin,
    productsDetailsGetController
);
router.get(
  '/products/delete',
    isAdmin,
    productsDeleteGetController
);
router.get(
  '/campaigns',
    isAdmin,
    campaignsGetController
);
router.get(
  '/campaigns/details',
    isAdmin,
    campaignsDetailsGetController
);
router.get(
  '/campaigns/delete',
    isAdmin,
    campaignsDeleteGetController
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
router.post(
  '/products/details',
    isAdmin,
    productsDetailsPostController
);
router.post(
  '/campaigns',
    upload.single('file'),
    isAdmin,
    campaignsPostController
);
router.post(
  '/campaigns/details',
    isAdmin,
    campaignsDetailsPostController
);
router.post(
  '/campaigns/end',
    isAdmin,
    campaignsEndPostController
);

module.exports = router;
