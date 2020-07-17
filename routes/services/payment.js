const express = require('express');
const { verify, auth } = require('../../middlewares');
const controller = require('../../controllers/services/paymentController');
const router = express.Router();
router.post('/', [], controller.createPayment);
router.put('/', [], controller.updatePayment);
router.delete('/', [], controller.deletePayment);
module.exports = router;
