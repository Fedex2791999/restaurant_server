module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('orderdetail', {
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchaseCost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saleCost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP').UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  });
  return OrderDetail;
};
