// Requires (Importación de librerías de terceros)
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// configurar CORS
app.use( cors() );

// Base de datos
dbConnection();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');

// Conexión a la base de datos
// user: lmanselmoa
// pass: DarkAlone6144

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/', appRoutes);


// Escuchar peticiones
app.listen( process.env.PORT, ()=> {
    console.log('Express server puerto ' + process.env.PORT + ': \x1b[32m%s\x1b[0m', 'Online');
});