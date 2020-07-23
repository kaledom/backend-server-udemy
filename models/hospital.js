/*
    Hospital Model
*/
const { Schema, model } = require('mongoose');

var rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}


var hospitalSchema = new Schema({

    nombre: { 
        type: String, 
        unique: true,
        required: [true, 'El nombre es necesario'] 
    },
    img: {  
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' });

//hospitalSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' } )
hospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', hospitalSchema);