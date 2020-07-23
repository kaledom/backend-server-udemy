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
// Obtener todos los medicos
// ==========================================
router.get( '/',  getMedicos );


// ==========================================
// Crear un nuevo medico
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
// Actualizar medico
// ==========================================
router.put( '/:id', 
            [
                validarJWT,
                check('nombre','El nombre es requerido').not().isEmpty(), 
                check('hospital','El id del hospital es requerido').not().isEmpty(),
                check('hospital','El id del hospital debe ser válido').isMongoId(),
                validarCampos
            ], 
            actualizarMedico 
);

// ==========================================
// Borrar medico por id
// ==========================================
router.delete( '/:id',
               [
                    validarJWT  
               ],
               borrarMedico
);

module.exports = router;
