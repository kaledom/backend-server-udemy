/*
    Médico Model
*/
const { Schema, model } = require('mongoose');

var medicoSchema = new Schema({

    nombre: { 
        type: String, 
        required: [true, 'El nombre es necesario'] 
    },
    img: {  
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

});

//medicoSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' } )
medicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', medicoSchema);