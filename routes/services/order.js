const express = require('express');
const { verify, auth } = require('../../middlewares');
const controller = require('../../controllers/services/orderController');
const router = express.Router();
router.post('/booking', [auth.verifyToken], controller.BookingTable);
router.post('/',  [auth.verifyToken], controller.createOrder);
router.put('/', [auth.verifyToken], controller.updateOrder);
router.get('/', [auth.verifyToken], controller.getOrder);
router.get('/:id', [auth.verifyToken], controller.getListOrder);
router.delete('/', [auth.verifyToken], controller.deleteOrder);
router.post('/detail', [auth.verifyToken], controller.createOrderDetail);
router.put('/detail', [auth.verifyToken], controller.updateOrderDetail);
router.delete('/detail', [auth.verifyToken], controller.deleteOrderDetail);

module.exports = router;
