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
  [auth.verifyToken],
  controller.createCategory
);
router.put(
  '/category/',
  [auth.verifyToken, verify.checkShopExisted],
  controller.updateCategory
);
router.delete(
  '/category/:id',
  [auth.verifyToken, verify.checkShopExisted],
  controller.deleteCategory
);
router.get('/category/', [auth.verifyToken], controller.getAllCategory);
router.get('/testFilterDate/', controller.testFilterDate);

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
