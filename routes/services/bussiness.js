const express = require('express');
const controller = require('../../controllers/services/businessController');
const { verify, auth } = require('../../middlewares');
const router = express.Router();
router.post('/', [verify.checkNameShop], controller.createBussiness);
router.get('/', [auth.verifyToken], controller.getAllBussiness);
router.post(
  '/resigster',
  [verify.checkUsername],
  controller.createBussinessAdmin
);
router.post(
  '/category/',
  [auth.verifyToken, verify.checkShopExisted],
  controller.createCategory
);
router.get('/category/', [auth.verifyToken], controller.getAllCategory);
router.get(
  '/category/:categoryId',
  [auth.verifyToken],
  controller.getCategoryDetail
);
router.post(
  '/category/:categoryId',
  [auth.verifyToken],
  controller.createItemCategory
);

module.exports = router;
