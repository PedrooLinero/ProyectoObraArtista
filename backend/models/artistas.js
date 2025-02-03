// models/artistas.js
module.exports = function(sequelize, DataTypes) {
    const Artistas = sequelize.define('Artistas', {
      idartista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellidos: {
        type: DataTypes.STRING
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  
    // Relación inversa (Un artista tiene muchas obras)
    Artistas.associate = function(models) {
      Artistas.hasMany(models.Obras, { foreignKey: 'idartista' });
    };
  
    return Artistas;
  };
  