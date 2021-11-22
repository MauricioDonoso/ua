
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret='contrasena_2020_para__crisis_sanitariaeSpejo_202o_supertaresguardada_o_algo__así';

exports.ensureAuth = function(req, res, next){
    //Verificacion en la cabecera
    // console.log(req.headers)

    if(!req.headers.authorization){
        return res.status(403).send({ message:'La peticion no tiene la cabecera de autentication' });
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({ message:'El token ha expirado' });
        }
    }catch(ex){
        return res.status(400).send({ message:'El token no es valido' });
    }
    req.user = payload;
    next();
};
