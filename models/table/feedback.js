module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('feedback', {
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
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
  return Feedback;
};
