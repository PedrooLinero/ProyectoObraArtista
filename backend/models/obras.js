const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('obras', {
    idobra: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'obras',
    timestamps: false
  });
};