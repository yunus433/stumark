const express = require('express');
const router = express.Router();

const isLoggedin = require('../middleware/isLoggedin');

const indexGetController = require('../controllers/index/get');

const indexPostController = require('../controllers/index/post');

router.get(
  '/', 
    indexGetController
);

router.get(
  '/campaign',
    isLoggedin,
    indexPostController
);

module.exports = router;
