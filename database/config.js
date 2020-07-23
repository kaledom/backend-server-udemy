const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, 
                               {
                                useNewUrlParser: true, 
                                useUnifiedTopology: true,
                                useCreateIndex: true
                               }
        );
        
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BBDD. Ver logs');   
    }

}

module.exports = {
    dbConnection
}


