'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret='contrasena_2020_para__crisis_sanitariaeSpejo_202o_supertaresguardada_o_algo__así';

exports.createToken = function(user){ 
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        rut:user.rut,
        apellido: user.apellido,
        fechaCreacion: user.create_at,
        telefono: user.telefono,
        email: user.email,
        iat: moment().unix(),     
        //dura 1 dia el token
        exp: moment().add(1,'day').unix
    };
    return jwt.encode(payload, secret);
};
