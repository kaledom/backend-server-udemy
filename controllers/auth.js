const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async ( req, res = response ) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({ email });

        let usuario;
        if ( !usuarioDB ) {
            // Si no existe el usuario:
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Si existe:
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@@';
        }

        // Guardar en BBDD
        await usuario.save();

        // Generar el token con JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token de Google no válido.',
            googleToken
        })
    }

}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    // Generar el token con JWT
    const token = await generarJWT( usuario.id );

    res.json({
        ok: true,
        msg: 'renewToken',
        uid,
        token
    })
}

module.exports = {
    loginUsuario,
    googleSignIn,
    renewToken
}