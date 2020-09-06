const db = require('../../models');
const { Op, where } = require('sequelize');
const Category = db.category;
const sequelize = db.sequelize;
const Shop = db.shop;
const User = db.user;
const Item = db.item;
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
      name: req.body.nameShop,
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

exports.getAllCategory = async (req, res) => {
  try {
    const data = await Category.findAll({
      where: {
        shopId: req.user.shopId
      },
      include: ['items'],
    });
    res.status(200).send({ status: 'success', data });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Lỗi rồi :(',
    });
  }
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
exports.createCategory = async (req, res) => {
  try {
    const category = {
      name: req.body.name,
      image: req.body.image,
      shopId: req.user.shopId
    };
      await Category.create(category);
    res.status(200).send({
      status: 'Success',
      message: 'Create category success!!',
      category
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Lỗi cmnr',
    });
  }
};
exports.updateCategory = async (req, res) => {
  console.log('updateCategory');
  try {
    console.log(req.body);
    const category = {
      name: req.body.name,
      image: req.body.image,
    };
    const data = await Category.update(category, {
      where: { id: req.body.id },
    });
    const result = await Category.findByPk(req.body.id);
    if (data[0] == 1) {
      res.status(200).send({
        status: 'Success',
        message: 'Update category success!!',
        result,
      });
    } else {
      res.status(400).send({ status: 'Failed', message: 'Not found id' });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Lỗi rồi',
      sequelize,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    console.log('deleteCategory');
    console.log(req.params);
    const data = await Category.destroy({ where: { id: req.params.id } });
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
  console.log('abc');
  console.log(req.body);
  let shopId = await createShop(req, res);
  createUser(req, res, shopId);
};
exports.testFilterDate = async (req, res) => {
  try {
    console.log('testFilterDate');
    console.log(req.params);
    const data = await Category.findAll({
      where: {
        updatedAt: {
          [Op.gte]: '2020-06-23',
          [Op.lte]: '2020-07-24',
        },
      },
    });
    res.status(200).send({
      status: 'success',
      data,
    });
    console.log(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Lỗi rồi',
    });
  }
};
