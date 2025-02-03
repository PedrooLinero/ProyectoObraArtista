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

      res.status(201).json(Respuesta.exito(artistaNueva, "Artista insertado"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear un artista nuevo: ${artista}`));
    }
  }


  async getAllArtista(req, res) {
    try {
      console.log("Entrando en getAllArtista");
      
      // 🔴 Registra la consulta que Sequelize genera
      const data = await Artista.findAll({
        logging: console.log, // Muestra la consulta en consola
      });
  
      res.json(Respuesta.exito(data, "Datos de artistas recuperados"));
    } catch (err) {
      console.error("Error en getAllArtista:", err);
  
      res.status(500).json(
        Respuesta.error(
          null,
          `Error al recuperar los datos de los artistas: ${req.originalUrl}`
        )
      );
    }
  }
  

//   async getArtistaById(req, res) {
//     // Implementa la lógica para recuperar una obra por su id
//     const idartista = req.params.idartista;

//     try {
//       const artista = await Artista.findByPk(idartista);
//       if (artista) {
//         res.json(Respuesta.exito(artista, "Artista recuperado"));
//       } else {
//         res
//           .status(404)
//           .json(Respuesta.error(null, `Artista con id ${idartista} no encontrado`));
//       }
//     } catch (err) {
//       res
//         .status(500)
//         .json(
//           Respuesta.error(
//             null,
//             `Error al recuperar el artista con id ${idartista}: ${err}`
//           )
//         );
//     }
//   }
 }

module.exports = new ArtistaController();