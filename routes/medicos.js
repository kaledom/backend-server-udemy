/*
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt')

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')

const router = Router();

// Rutas

// ==========================================
// Obtener todos los usuarios
// ==========================================
router.get( '/',  getMedicos );


// ==========================================
// Crear un nuevo usuario
// ==========================================
router.post( '/', 
             [
                validarJWT,
                check('nombre','El nombre es requerido').not().isEmpty(),
                check('hospital','El id del hospital es requerido').not().isEmpty(),
                check('hospital','El id del hospital debe ser válido').isMongoId(),
                
                validarCampos
             ], 
             crearMedico 
);

// ==========================================
// Actualizar usuario
// ==========================================
router.put( '/:id', 
            [
                  
            ], 
            actualizarMedico 
);

// ==========================================
// Borrar usuario por id
// ==========================================
router.delete( '/:id',
               [
                      
               ],
               borrarMedico
);

module.exports = router;
