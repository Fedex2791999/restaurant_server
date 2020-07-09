const db = require('../../models');
const Category = db.category;
const Shop = db.shop;
const User = db.user;
const Item = db.item;
const { Op } = db.Sequelize;
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const config = require('../../configs/auth');

const createUser = async (req, res, shopId) => {
  try {
    const user = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      shopId: shopId,
    };
    const data = await User.create(user);
    let token = jwt.sign({ id: data.id }, config.secret, {
      expiresIn: '1d',
    });
    res.send({ data, token });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Lỗi cmnr',
    });
  }
};
const createShop = async (req, res) => {
  try {
    const shop = {
      name: req.body.name,
    };
    const data = await Shop.create(shop);
    res.send({ status: 'success', data });
    return data.id;
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Lỗi rồi :(',
    });
  }
};

exports.getAllCategory = (req, res) => {
  Category.findAll({ include: ['items'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
exports.getCategoryDetail = (req, res) => {
  const { categoryId } = req.params;
  Category.findByPk(categoryId, { include: ['items'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Tutorial with id=' + id,
      });
      console.log(err);
    });
};
exports.createCategory = (req, res) => {
  const category = {
    name: req.body.name,
    image: req.body.image,
    shopId: req.body.shopId,
  };
  Category.create(category)
    .then(data => {
      res.send({ userId: req.user.id, data });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Lỗi cmnr',
      });
    });
};
exports.createItemCategory = (req, res) => {
  const { categoryId } = req.params;
  const item = {
    name: req.body.name,
    image: req.body.image,
    purchaseCost: req.body.purchaseCost,
    saleCost: req.body.saleCost,
    shopId: req.body.shopId,
    categoryId: categoryId,
  };
  Item.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Lỗi cmnr',
      });
    });
};

exports.createBussiness = (req, res) => {
  createShop(req, res);
};
exports.getAllBussiness = (req, res) => {
  Shop.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
exports.createBussinessAdmin = async (req, res) => {
  let shopId = await createShop(req, res);
  createUser(req, res, shopId);
};
