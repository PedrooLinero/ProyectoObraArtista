// obraRoutes.js

const express = require('express');
const router = express.Router();
const obraController = require('../controller/obraController');

router.get('/', obraController.getAllObra);
router.get('/:idobra', obraController.getObraById);
router.post('/', obraController.createObra);
router.delete('/:idobra', obraController.deleteObra);
router.put('/:idobra', obraController.updateObra);
router.get('/idartista/:idartista', obraController.getObraByArtista);
router.get('/nombre/:nombre', obraController.getObraByNombre);

module.exports = router;
