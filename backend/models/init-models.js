var DataTypes = require("sequelize").DataTypes;
var _artistas = require("./artistas");
var _obras = require("./obras");
// var _users = require("./users");

function initModels(sequelize) {
  var artistas = _artistas(sequelize, DataTypes);
  var obras = _obras(sequelize, DataTypes);
  //var users = _users(sequelize, DataTypes);

  artistas.belongsTo(obras, { as: "idobra_obra", foreignKey: "idobra"});
  obras.hasMany(artistas, { as: "artistas", foreignKey: "idobra"});
  return {
    artistas,
    obras
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
