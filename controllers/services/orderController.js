const db = require('../../models');
const Category = db.category;
const Shop = db.shop;
const User = db.user;
const Item = db.item;
const { Op } = db.Sequelize;
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const config = require('../../configs/auth');
const  check = require('../../function/check');
const {accountSid, authToken} = require('../../configs/mes')
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
