'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var PostulacionSchema = Schema({
    
    create_at: {
        type: Date,
    },
    email:String,
    nombre:String,
    telefono:String,
    captcha:String,
    apellidoP:String,
    region:String,
    comuna:String,
    rut:String,
    apellidoM:String,
    telefonoOpcional:String,
    estadoCivil:String,
    establecimientoE:String,
    tipoEstablecimiento:String,
    egreso:Number,
    trabajando:String,
    carrera:String,
    comoEntero:String,
    comoEnteroOtro:String,
    decidioEstudiar:String,
    decidioEstudiarOtro:String,
    nacionalidad:String,
    sexo:String,
    fechaNacimiento:String,
    domicilio:String,

});
module.exports = mongoose.model('Postulacion', PostulacionSchema);