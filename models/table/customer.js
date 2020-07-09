module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
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
  return Customer;
};
