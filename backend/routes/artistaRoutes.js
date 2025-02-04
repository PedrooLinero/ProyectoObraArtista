// artistaRoutes.js

const express = require('express');
const router = express.Router();
const artistaController = require('../controller/artistaController');

router.get('/', artistaController.getAllArtista);
router.get('/:idartista', artistaController.getArtistaById);
router.post('/', artistaController.createArtista);
router.delete('/:idartista', artistaController.deleteArtista);
router.put('/:idartista', artistaController.updateArtista);

module.exports = router;

