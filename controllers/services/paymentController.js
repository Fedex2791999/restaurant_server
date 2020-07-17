const db = require('../../models');
const Payment = db.payment;

exports.createPayment = async (req, res) => {
  try {
    const payment = {
      totalCash: req.body.totalCash,
      totalCredit: req.body.totalCredit,
      shopId: req.body.shopId,
      orderId: req.body.orderId,
      customerId: req.body.customerId
    };
    const data = await Payment.create(payment);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Lỗi rồi',
    });
  }
};
exports.updatePayment = async (req, res) => {
  try {
    const payment = {
      totalCash: req.body.totalCash,
      totalCredit: req.body.totalCredit,
      shopId: req.body.shopId,
      orderId: req.body.orderId,
      customerId: req.body.customerId
    };
    const data = await Payment.update(payment, { where: { id: req.body.id } });
    const result = await Payment.findByPk(req.body.id);
    if (data[0] == 1) {
      res.status(200).send({ status: 'Success', result });
    } else {
      res.status(400).send({ status: 'Failed', message: 'Not found id' });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Lỗi rồi',
    });
  }
};
exports.deletePayment = async (req, res) => {
  try {
    const data = await Payment.destroy({ where: { id: req.body.id } });
    if (data == 1) {
      res.status(200).send({ status: 'Success', message: 'Detete successfully' });
    } else {
      res.status(400).send({ status: 'Failed', message: ' Not Found id' });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Lỗi rồi',
    });
  }
};
