const db = require('../../models');
const Order = db.order;
const OrderDetail = db.orderdetail;
const config = require('../../configs/auth');
const check = require('../../function/check');
const { accountSid, authToken } = require('../../configs/mes');
const client = require('twilio')(accountSid, authToken);
exports.BookingTable = (req, res) => {
  const { phone, date, time, people, name, numberTable } = req.body;

  const sms =
    '\n==ĐẶT BÀN==\n\n' +
    'Tôi tên là: ' +
    name +
    '\nSĐT: ' +
    phone +
    '\nĐã đặt bàn vào ngày: ' +
    date +
    '\nVào lúc: ' +
    time +
    ' h' +
    '\nBàn số: ' +
    numberTable +
    '\nSố lượng người: ' +
    people +
    '\n\n====TRÂN TRỌNG====';
  console.log(sms);

  let sql = `INSERT INTO booking(name, phone, date,  time, people, numberTable)  VALUES (?, ? , ?, ?, ?, ?)`;
  console.log(sql);

  let values = [name, phone, date, time, people, numberTable];
  connection.query(sql, values, (err, result, fields) => {
    if (err) console.log(err);
    console.log(result);
  });

  // send message to my phone

  client.messages
    .create({
      body: sms,
      from: '+12028049954',
      to: '+84973405092',
    })
    .then(message => {
      console.log('Đã gửi tin nhắn đến +84973405092 ');
      console.log(message.sid);
      res.end('Đã gửi tin nhắn');
    });
};

exports.createOrder = async (req, res) => {
  try {
    const order = {
      numberTable: req.body.numberTable,
    };
    const data = await Order.create(order);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Lỗi rồi',
    });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const order = {
      numberTable: req.body.numberTable,
    };
    const data = await Order.update(order, { where: { id: req.body.id } });
    const result = await Order.findByPk(req.body.id);
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
exports.deleteOrder = async (req, res) => {
  try {
    const data = await Order.destroy({ where: { id: req.body.id } });
    if (data == 1) {
      res
        .status(200)
        .send({ status: 'Success', message: 'Detete successfully' });
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

exports.createOrderDetail = async (req, res) => {
  try {
    const orderDetail = {
      quantity: req.body.quantity,
      total: req.body.total,
      discount: req.body.discount,
      purchaseCost: req.body.purchaseCost,
      saleCost: req.body.saleCost,
      shopId: req.body.shopId,
      orderId: req.body.orderId,
      itemId: req.body.itemId,
    };
    const data = await OrderDetail.create(orderDetail);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Lỗi rồi',
    });
  }
};
exports.updateOrderDetail = async (req, res) => {
  try {
    const orderDetail = {
      quantity: req.body.quantity,
      total: req.body.total,
      discount: req.body.discount,
      purchaseCost: req.body.purchaseCost,
      saleCost: req.body.saleCost,
      shopId: req.body.shopId,
      orderId: req.body.orderId,
      itemId: req.body.itemId,
    };
    const data = await OrderDetail.update(orderDetail, { where: { id: req.body.id } });
    const result = await OrderDetail.findByPk(req.body.id);
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
exports.deleteOrderDetail = async (req, res) => {
  try {
    const data = await OrderDetail.destroy({ where: { id: req.body.id } });
    if (data == 1) {
      res
        .status(200)
        .send({ status: 'Success', message: 'Detete successfully' });
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
