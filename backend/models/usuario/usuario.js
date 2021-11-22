'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var UsuarioSchema = Schema({
    
    create_at: {
        type: Date,
    },
    email:String,
    nombre:String,
    telefono:String,
    captcha:String,
    apellido:String,
    region:String,
    comuna:String,
    rut:String,

});
module.exports = mongoose.model('Usuario', UsuarioSchema);