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

const actualizarMedico = async (req,res = response) => {

    const medicoId = req.params.id;
    const uid = req.uid;

    try {

        medicoDB = await Medico.findById( medicoId );
        if ( !medicoDB ) {
            res.status(400).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            })
        }

        // Actualizar datos
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( medicoId, cambiosMedico, { new: true} );

        res.json({
            ok: true,
            medico: medicoActualizado
        });


    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Contacte con el administrador'
        })
    }

}

const borrarMedico = async (req,res = response) => {

    const medicoId = req.params.id;

    try {

        medicoDB = await Medico.findById( medicoId );
        if ( !medicoDB ) {
            res.status(400).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            })
        }

        await Medico.findByIdAndDelete( medicoId );

        res.json({
            ok: true,
            msg: 'Médico borrado'
        });


    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Contacte con el administrador'
        })
    }

}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}