const express = require('express');
const { verify } = require('../../middlewares');
const controller = require('../../controllers/auth/authController');
const router = express.Router();
router.post(
  '/signup',
  [verify.checkUsername, verify.checkRolesExisted, verify.checkShopExisted],
  controller.signup
);

router.post('/signin', controller.signin);
module.exports = router;
