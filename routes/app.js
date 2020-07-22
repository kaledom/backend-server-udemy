var express = require('express');
var app = express();

// Rutas
app.get('/', (req, res, next) =>  {

    res.json({
        ok: true, 
        mensaje: 'petición realizada correctamente 2'
    })

});


module.exports = app;
