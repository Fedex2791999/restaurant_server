const dbconfig = require('../configs/db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  operatorsAliases: false,
  port: dbconfig.PORT,
  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.acquire.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle,
  },
});
console.log('Model');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require('./tutorial.model')(sequelize, Sequelize);
db.admin = require('./table/admin')(sequelize, Sequelize);
db.shop = require('./table/shop')(sequelize, Sequelize);
db.category = require('./table/category')(sequelize, Sequelize);
db.customer = require('./table/customer')(sequelize, Sequelize);
db.feedback = require('./table/feedback')(sequelize, Sequelize);
db.item = require('./table/item')(sequelize, Sequelize);
db.order = require('./table/order')(sequelize, Sequelize);
db.orderdetail = require('./table/orderdetail')(sequelize, Sequelize);
db.payment = require('./table/payment')(sequelize, Sequelize);
db.reservation = require('./table/reservation')(sequelize, Sequelize);
db.role = require('./table/role')(sequelize, Sequelize);
db.user = require('./table/user')(sequelize, Sequelize);

// create Association
db.shop.hasOne(db.admin);
db.admin.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasOne(db.user, {
  onDelete: 'CASCADE',
  hook: true
});
db.user.belongsTo(db.shop, {
  foreignKey: {
    name: 'shopId',
  }
});
db.shop.hasMany(db.category);
db.category.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasMany(db.order);
db.order.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasMany(db.orderdetail);
db.orderdetail.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasMany(db.item);
db.item.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasMany(db.feedback);
db.feedback.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasMany(db.customer);
db.customer.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasMany(db.payment);
db.payment.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.shop.hasMany(db.reservation);
db.reservation.belongsTo(db.shop, {
  foreignKey: 'shopId',
});
db.category.hasMany(db.item);
db.item.belongsTo(db.category, {
  foreignKey: 'categoryId',
});
db.order.hasMany(db.orderdetail);
db.orderdetail.belongsTo(db.order, {
  foreignKey: 'orderId',
});
db.customer.hasMany(db.order);
db.order.belongsTo(db.customer, {
  foreignKey: 'customerId',
});
db.item.hasMany(db.orderdetail);
db.orderdetail.belongsTo(db.item, {
  foreignKey: 'itemId',
});
db.order.hasOne(db.payment);
db.payment.belongsTo(db.order, {
  foreignKey: 'orderId',
});
db.customer.hasMany(db.payment);
db.payment.belongsTo(db.customer, {
  foreignKey: 'customerId',
});
db.customer.hasMany(db.feedback);
db.feedback.belongsTo(db.customer, {
  foreignKey: 'customerId',
});
db.customer.hasMany(db.reservation);
db.reservation.belongsTo(db.customer, {
  foreignKey: 'customerId',
});

// authen
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
