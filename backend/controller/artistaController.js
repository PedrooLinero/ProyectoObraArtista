// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo obra
const Artista = models.artistas;

class ArtistaController {
  async createArtista(req, res) {
    // Implementa la lógica para crear una nueva obra
    const artista = req.body;

    try {
      const artistaNueva = await Artista.create(artista);

      res.status(201).json(Respuesta.exito(obraNueva, "Artista insertado"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear un artista nuevo: ${artista}`));
    }
  }
}

module.exports = new ArtistaController();