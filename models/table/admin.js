module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'admin',
    {
      id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      usename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
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
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['shopId'],
        },
      ],
    }
  );
  return Admin;
};
