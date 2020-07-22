/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
var bcrypt = require('bcryptjs');

// var jwt = require('jsonwebtoken');
// var SEED = require('../config/config').SEED;

const mdAutenticacion = require('../middlewares/autentication')

//var app = express();

const router = Router();

var Usuario = require('../models/usuario');

// Rutas

// ==========================================
// Obtener todos los usuarios
// ==========================================
router.get( '/', validarJWT, getUsuarios );


// ==========================================
// Crear un nuevo usuario
// ==========================================
router.post( '/', 
             [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                check('email', 'El correo es obligatorio').not().isEmpty(),
                check('email', 'El correo debe ser válido').isEmail(),
                validarCampos
             ], 
             crearUsuario 
);

// ==========================================
// Actualizar usuario
// ==========================================
router.put( '/:id', 
            [
                validarJWT, 
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El correo es obligatorio').not().isEmpty(),
                check('email', 'El correo es obligatorio').isEmail(),
                check('role', 'El rol debe ser válido').not().isEmpty(),
                validarCampos    
            ], 
            actualizarUsuario 
);

// ==========================================
// Borrar usuario por id
// ==========================================
router.delete( '/:id',
               [
                    validarJWT  
               ],
               borrarUsuario
);

module.exports = router;
