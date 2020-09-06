const express = require('express');
const { verify, auth } = require('../../middlewares');
const controller = require('../../controllers/services/paymentController');
const router = express.Router();
router.post('/', [auth.verifyToken], controller.createPayment);
router.put('/', [auth.verifyToken], controller.updatePayment);
router.delete('/', [auth.verifyToken], controller.deletePayment);
module.exports = router;
