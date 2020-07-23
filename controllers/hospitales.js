/*
    Hospitales Controller
*/
const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req,res = response) => {

    const hosìtalesDB = await Hospital.find()
                                        .populate('usuario','nombre img');

    res.json({
        ok: true,
        hosìtalesDB
    });

}

const crearHospital = async (req,res = response) => {
   
    const hospital = new Hospital({
        usuario: req.uid,
        ...req.body
    });
    try {

       const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarHospital = (req,res = response) => {

    res.json({
        ok: true,
        msg: 'Método actualizarHospital'
    });

}

const borrarHospital = (req,res = response) => {

    res.json({
        ok: true,
        msg: 'Método borrarHospital'
    });

}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}