const fs = require('fs'); // Filesystem

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagenAntigua = ( path ) => {
    if ( fs.existsSync ( path) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path)
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {
    console.log('Entrando en actualizarImagen');
    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById( id );   
            if ( !medico ) {
                console.log('Médico no encontrado');
                return false;
            }

            const pathViejoM = `./uploads/medicos/${ medico.img }`; 
            borrarImagenAntigua( pathViejoM );
            
            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
    
        case 'hospitales':
            const hospital = await Hospital.findById( id );   
            if ( !hospital ) {
                console.log('Hospital no encontrado');
                return false;
            }

            const pathViejoH = `./uploads/hospitales/${ hospital.img }`; 
            borrarImagenAntigua( pathViejoH );
            
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById( id );   
            if ( !usuario ) {
                console.log('Usuario no encontrado');
                return false;
            }

            const pathViejoU = `./uploads/usuarios/${ usuario.img }`; 
            borrarImagenAntigua( pathViejoU );
            
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    }
}

module.exports = {
    actualizarImagen
}