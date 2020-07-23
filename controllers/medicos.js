/*
    Médicos Controller
*/
const { response } = require('express')

const Medico = require('../models/medico')

const getMedicos = async (req,res = response) => {


    try {
        const medicosDB = await Medico.find()
                                        .populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img');
    
        res.json({
            ok: true,
            medicosDB
        });
                                        
   } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado. Consulte con el administrador'
        })
    }
   

}

const crearMedico = async (req,res = response) => {

    const medico = new Medico({
        usuario: req.uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado. Consulte con el administrador.'
        })
    }

    

}

const actualizarMedico = (req,res = response) => {

    res.json({
        ok: true,
        msg: 'Método actualizarMedico'
    });

}

const borrarMedico = (req,res = response) => {

    res.json({
        ok: true,
        msg: 'Método borrarMedico'
    });

}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}