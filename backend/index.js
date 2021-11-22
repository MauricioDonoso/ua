
'use strict'

var mongoose = require('mongoose');
var app = require('./app');

const port = process.env.PORT || 3841;
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/soytecnicoua', {useUnifiedTopology: true, useNewUrlParser : true ,useCreateIndex: true} ).then(()=>{
    console.log('La conexion a la DB fue realizada correctamente');
    app.listen(port, () =>{
        console.log("Servidor se encuentra funcionando soytecnicoua")
    });
}).catch(err => console.log(err));
