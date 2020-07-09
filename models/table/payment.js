module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    totalCash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalCredit: {
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
  }, {
    indexes: [
      {
        unique: true,
        fields: ['orderId'],
      },
    ],
  });
  return Payment;
};
