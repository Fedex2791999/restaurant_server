const express = require('express');
const { verify,auth } = require('../../middlewares');
const controller = require('../../controllers/services/orderController');
const router = express.Router();
router.post(
  '/booking', [auth.verifyToken],
  controller.BookingTable
);

module.exports = router;
