const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "artistas",
    {
      idartista: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      fechaCreacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "artistas",
      timestamps: false, // Evita problemas con createdAt y updatedAt
    }
  );
};
