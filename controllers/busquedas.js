/*
    Búsquedas Controller
*/
const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

// Método getTodo
const getTodo = async(req, res = response) => {

    console.log('Entrando en el método getTodo');
    const patronBusqueda = req.params.busqueda;
    const regex = new RegExp( patronBusqueda, 'i' );

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),

    ]);

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })

}


// Método getDocumentosColeccion
const getDocumentosColeccion = async(req, res = response) => {

    console.log('Entrando en el método getDocumentosColeccion');
    const tabla = req.params.tabla;
    const patronBusqueda = req.params.busqueda;
    const regex = new RegExp( patronBusqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });        
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }

    res.json({
        ok: true,
        tabla,
        resultados: data
    })

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}

