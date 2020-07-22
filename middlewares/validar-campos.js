const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    const errores = validationResult( req );
    //console.log('Antes de comprobar errores', errores.isEmpty());
    if ( ! errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    
    next();

}

module.exports = {
    validarCampos
}