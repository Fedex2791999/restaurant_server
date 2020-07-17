const db = require('../../models');
const config = require('../../configs/auth');
const User = db.user;
const Role = db.role;
const { Op } = db.Sequelize;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
console.log('Controller');

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      shopId: req.body.shopId,
    });
    if (!user) {
      res.status(500).send({
        message: 'Create user failed!',
      });
    }
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: '1d',
    });
    res.send({
      message: 'User was registered successfully!',
      id: user.id,
      username: user.username,
      password: user.password,
      rememberPass: user.rememberPass,
      shopId: user.shopId ? user.shopId : null,
      token: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      err: 'Mỗi nhà hàng chỉ có 1 admin',
    });
  }
};

exports.signin = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    // update repassword status
    user.rememberPass = req.body.rememberPass;
    await user.save();

    let validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        message: 'Invalid Password',
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: '1d',
    });
    // let authorities = [];
    // user.getRoles().then(roles => {
    //   for (let i = 0; i < roles.length; i++) {
    //     authorities.push('ROLE_' + roles[i].name.toUpperCase());
    //   }
    res.status(200).send({
      id: user.id,
      username: user.username,
      shopId: user.shopId,
      rememberPass: user.rememberPass,
      token: token,
      // roles: authorities,
    });
  } catch (err) {
    console.log('Lỗi server model');
    res.status(500).send({ message: err.message });
  }
};
