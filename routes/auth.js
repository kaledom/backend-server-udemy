/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { loginUsuario, googleSignIn, renewToken } = require('../controllers/auth')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// var SEED = require('../config/config').SEED;

// var app = express();

// var Usuario = require('../models/usuario');

router.post( '/',
             [
                check('email', 'El correo es obligatorio').not().isEmpty(),
                check('email', 'El correo es obligatorio').isEmail(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                validarCampos
             ] ,
             loginUsuario
 );

 router.post( '/google',
             [
                check('token', 'El token de Google es obligatorio').not().isEmpty(),
                validarCampos
             ] ,
             googleSignIn
 );

 router.get( '/renew', validarJWT, renewToken );
 
//  (req, res) => {

//     var body = req.body;

//     Usuario.findOne( { email: body.email }, ( err, usuarioDB ) => {

//         if ( err ) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error al buscar usuario',
//                 errors: err
//             });
//         }

//         if ( !usuarioDB ) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'Credenciales incorrectas - email',
//                 errors: { message: 'Credenciales incorrectas - email' }
//             });    
//         }

//         if ( !bcrypt.compareSync( body.password, usuarioDB.password ) ) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'Credenciales incorrectas - pass',
//                 errors: { message: 'Credenciales incorrectas - pass' }
//             });          
//         }

//         // Crear un token
//         usuarioDB.password = ':)';
//         var token = jwt.sign({ usuario: usuarioDB}, SEED, { expiresIn: 14400 }) // 4 horas

//         res.status(200).json({
//             ok: true,
//             usuario: usuarioDB,
//             token: token,
//             id: usuarioDB._id
//         }); 

//     } );

   

// })

module.exports = router;