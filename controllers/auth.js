const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar correo
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales no válidas (correo no encontrado)'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Credenciales no válidas (contraseña no válida)'
                })
        }

        // Generar el token con JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })

    } catch ( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Si el problema persiste, contacte con el administador.'
        })
    }
} 

module.exports = {
    loginUsuario
}