const db = require('../../models');
const config = require('../../configs/auth');
const User = db.user;
const Role = db.role;
const { Op } = db.Sequelize;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
console.log('Controller');

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    shopId: req.body.shopId,
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          //mã hóa userId
          let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: '1d',
          });
          user.setRoles(roles).then(() => {
            res.send({
              message: 'User was registered successfully!',
              id: user.id,
              username: user.username,
              password: user.password,
              shopId: user.shopId ? user.shopId : null,
              token: token,
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({
            message: 'User was registered successfully!',
            id: user.id,
            username: user.username,
            password: user.password,
            shopId: user.shopId ? user.shopId : null,
            token: token,
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        console.log('ko tìm thấy username');
        return res.status(404).send({ message: 'User Not found.' });
      }
      // Found User check password
      // giải  mã  password trên database so sánh vs password req
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: '1d', // 3s dùng để set phiên đăng nhập 1 day
      });

      let authorities = [];
      user.getRoles().then(roles => {
        console.log(roles);
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          shopId: user.shopId,
          token: token,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
