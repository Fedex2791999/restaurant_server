const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
const Shop = db.shop;
checkUsername = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Username is already in use!',
      });
      return;
    }
    next();
  });
};
checkShopExisted = (req, res, next) => {
  if (!req.body.shopId) {
    return res.status(403).send({
      message: 'No shopId provided',
    });
  }
  Shop.findOne({
    where: {
      id: req.body.shopId,
    },
  }).then(shop => {
    if (!shop) {
      res.status(400).send({
        message: 'Not existed shop',
      });
      return;
    }
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};
checkNameShop = (req, res, next) => {
  Shop.findOne({
    where: {
      name: req.body.name,
    },
  }).then(shop => {
    if (shop) {
      res.status(400).send({
        message: 'Failed Shop is already exist',
      });
      return;
    }
    next();
  });
};

const verify = {
  checkUsername: checkUsername,
  checkRolesExisted: checkRolesExisted,
  checkNameShop: checkNameShop,
  checkShopExisted: checkShopExisted,
};

module.exports = verify;
