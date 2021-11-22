'use strict'

var express = require('express');
var api = express.Router();
var UsuarioController = require('../../controller/usuario/usuario');

api.post('/saveContacto', UsuarioController.saveContacto);
api.post('/savePostulacion', UsuarioController.savePostulacion);

module.exports = api;