module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('shop', {
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
  return Shop;
};
