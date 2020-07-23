/*
    Ruta: /api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt')

const { fileUpload, retornaImagen }  = require('../controllers/uploads');
const app = require('./app');

const router = Router();

router.use( expressFileUpload() );

// ==========================================
// Obtener todos los usuarios
// ==========================================
router.put( '/:tipo/:id', validarJWT, fileUpload );

router.get( '/:tipo/:foto', retornaImagen );

module.exports = router;