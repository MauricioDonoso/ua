'use strict'

var Usuario = require('../../models/usuario/usuario');
var CREDENTIAL = require('../../service/key');
var Postulacion = require('../../models/usuario/postulacion');

const nodemailer = require('nodemailer');
const emailExists = require('email-exists')


function saveContacto(req,res){
    var cuerpo = req.body;
    const http = require('https');
    const url = "https://www.google.com/recaptcha/api/siteverify?secret=6Leq1UUdAAAAAMe9Xhl2kAB6zN1RVRs2uKQtKgz9&response="+cuerpo.captcha ;
    http.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            if(JSON.parse(data).success && (JSON.parse(data).hostname == 'www.soytecnicoua.cl' ) || JSON.parse(data).success && (JSON.parse(data).hostname == 'localhost' )){
                Usuario.findOne({email:cuerpo.email.toLowerCase()}).exec((err,usuario)=>{
                    if(err) return res.status(500).send({message:'error en la peticion', err:true})
                    if(usuario) return res.status(404).send({message:'el usuario ya existe', user:true})
                    if(!usuario){                                    
                        var us = new Usuario();
                        us.nombre = cuerpo.nombre.toLowerCase();
                        us.apellido = cuerpo.apellido.toLowerCase();
                        us.email = cuerpo.email.toLowerCase();
                        us.telefono = cuerpo.telefono;
                        us.captcha = cuerpo.captcha;
                        us.region = cuerpo.region;
                        us.comuna = cuerpo.comuna;
                        us.rut = cuerpo.rut;
                        us.create_at = new Date()
                        var email =  'mauricio.donoso@brechadigital.cl'
                        nodemailer.createTestAccount((err, account) => {
                            let transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 465,
                                secure: true, // true for 465, false for other ports
                                auth: {
                                    user: CREDENTIAL.usr,
                                    pass: CREDENTIAL.pass
                                },
                            });
                            let mailOptions = {
                                from: '"Inscripcion UA" <soporte.formulario@gmail.com>', // sender address
                                to: email, // list of receivers
                                subject: 'Formulario ingresado con exito', // Subject line
                                text: 'Se ha registrado exitosamente una nueva solicitud de contacto', // plain text body
                                html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Se ha ingresado correctamente una nueva solicitud</div></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:justify;">A continuación encontrarás el detalle del registro ingresado.<div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left;pointer-events: none; cursor: default; text-decoration: none; color: black;">Nombre: <span style="font-weight:initial;">'+cuerpo.nombre.toUpperCase()+' '+cuerpo.apellido.toUpperCase()+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Email: <span style="font-weight:initial;">'+cuerpo.email.toLowerCase()+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Teléfono: <span style="font-weight:initial;">'+cuerpo.telefono+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Región: <span style="font-weight:initial;">'+us.region+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Comuna: <span style="font-weight:initial;">'+us.comuna+'</span></div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Para cualquier consulta contáctese a soporte.formulario@gmail.com.</div></div></div></div>',
                                attachments: [                                            
                                {   // file on disk as an attachment
                                    filename: 'ok.png',
                                    path: __dirname+'/../../img/ok.png', // stream this file,
                                    cid: 'correcto',
                                }],
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    res.status(404).send({ solicitud: 'no se puede enviar correo',correo:true});
                                }else{
                                    us.save((error, adminStored) => {
                                        if (error) return res.status(500).send({ message: 'Error al registrar', err: true });
                                        if (adminStored) {
                                            res.status(200).send({ message:'registro exitoso', nuevo: true });                                                   
                                        } else {
                                            res.status(404).send({ message: 'No se ha podido registrar', err:true });
                                        }
                                    }); 
                                }
                            })
                        })                                                      
                    }
                })
            }else{
                return res.status(404).send({message:'captcha invalido',captcha:true})
            }
        })
    })                  
}

function modFecha1(fecha){
    let a = new Date(fecha);
    let month = JSON.stringify(a.getMonth() + 1);
    let dia = JSON.stringify(a.getDate())
    var horaN = JSON.stringify(a.getHours());
    var minutos = JSON.stringify(a.getMinutes());
    if(dia.length == 1){
      dia ="0"+dia;
    }if(month.length == 1){
      month = "0"+month;
    }if(horaN.length == 1){
      horaN = "0"+horaN;
    }if(minutos.length == 1){
      minutos = "0"+minutos;
    }
    return  a.getFullYear()+'-'+month+'-'+dia
  }

function savePostulacion(req,res){
    var cuerpo = req.body;
    const http = require('https');
    const url = "https://www.google.com/recaptcha/api/siteverify?secret=6Leq1UUdAAAAAMe9Xhl2kAB6zN1RVRs2uKQtKgz9&response="+cuerpo.captcha ;
    http.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data))
            if(JSON.parse(data).success && (JSON.parse(data).hostname == 'www.soytecnicoua.cl' ) || JSON.parse(data).success && (JSON.parse(data).hostname == 'localhost' )){
                Postulacion.findOne({email:cuerpo.email.toLowerCase()}).exec((err,usuario)=>{
                    if(err) return res.status(500).send({message:'error en la peticion', err:true})
                    if(usuario) return res.status(404).send({message:'el usuario ya existe', user:true})
                    if(!usuario){                                    
                        var us = new Postulacion();
                        us.nombre = cuerpo.nombre.toLowerCase();
                        us.apellidoP = cuerpo.apellidoP.toLowerCase();
                        us.apellidoM = cuerpo.apellidoM.toLowerCase();
                        us.email = cuerpo.email.toLowerCase();
                        us.telefono = cuerpo.telefono;
                        us.captcha = cuerpo.captcha;
                        us.region = cuerpo.region;
                        us.comuna = cuerpo.comuna;
                        us.rut = cuerpo.rut;
                        us.create_at = new Date()
                        us.telefonoOpcional = cuerpo.telefonoOpcional
                        us.estadoCivil = cuerpo.estadoCivil
                        us.establecimientoE = cuerpo.establecimientoE
                        us.tipoEstablecimiento = cuerpo.tipoEstablecimiento
                        us.egreso = cuerpo.egreso
                        us.trabajando = cuerpo.trabajando
                        us.carrera = cuerpo.carrera
                        us.comoEntero = cuerpo.comoEntero
                        us.comoEnteroOtro = cuerpo.comoEnteroOtro
                        us.decidioEstudiar = cuerpo.i
                        us.decidioEstudiarOtro = cuerpo.decidioEstudiarOtro
                        us.nacionalidad = cuerpo.nacionalidad
                        us.sexo = cuerpo.sexo
                        us.fechaNacimiento = cuerpo.fechaNacimiento
                        us.domicilio = cuerpo.domicilio

                        var email =  'mauricio.donoso@brechadigital.cl'
                        nodemailer.createTestAccount((err, account) => {
                            let transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 465,
                                secure: true, // true for 465, false for other ports
                                auth: {
                                    user: CREDENTIAL.usr,
                                    pass: CREDENTIAL.pass
                                },
                            });
                            let mailOptions = {
                                from: '"Postulación UA" <soporte.formulario@gmail.com>', // sender address
                                to: email, // list of receivers
                                subject: 'Postulación ingresado con exito', // Subject line
                                text: 'Se ha registrado exitosamente una nueva solicitud de Postulación', // plain text body
                                html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Se ha ingresado correctamente una nueva Postulación</div></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:justify;">A continuación encontrarás el detalle de la Postulación ingresada.<div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left;pointer-events: none; cursor: default; text-decoration: none; color: black;">Nombre: <span style="font-weight:initial;">'+cuerpo.nombre.toUpperCase()+' '+cuerpo.apellidoP.toUpperCase()+' '+cuerpo.apellidoM.toUpperCase()+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Email: <span style="font-weight:initial;">'+cuerpo.email.toLowerCase()+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Teléfono: <span style="font-weight:initial;">'+cuerpo.telefono+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Rut: <span style="font-weight:initial;">'+cuerpo.rut.toLowerCase()+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Nacionalidad: <span style="font-weight:initial;">'+cuerpo.nacionalidad+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Sexo: <span style="font-weight:initial;">'+cuerpo.sexo+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Fecha de nacimiento: <span style="font-weight:initial;">'+modFecha1(cuerpo.fechaNacimiento)+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Domicilio: <span style="font-weight:initial;">'+cuerpo.domicilio+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Región: <span style="font-weight:initial;">'+us.region+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Comuna: <span style="font-weight:initial;">'+us.comuna+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Estado Civil: <span style="font-weight:initial;">'+cuerpo.estadoCivil+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Establecimiento Educacional: <span style="font-weight:initial;">'+cuerpo.establecimientoE+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Tipo de establecimiento: <span style="font-weight:initial;">'+cuerpo.tipoEstablecimiento+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Año de Egreo: <span style="font-weight:initial;">'+cuerpo.egreso+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Trabajando: <span style="font-weight:initial;">'+cuerpo.trabajando+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Carrera: <span style="font-weight:initial;">'+cuerpo.carrera+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Cómo se entero: <span style="font-weight:initial;">'+cuerpo.comoEntero+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Cómo se entero (otro): <span style="font-weight:initial;">'+cuerpo.comoEnteroOtro+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Decidió estudiar en UA: <span style="font-weight:initial;">'+cuerpo.decidioEstudiar+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Decidió estudiar en UA (otro): <span style="font-weight:initial;">'+cuerpo.decidioEstudiarOtro+'</span></div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Para cualquier consulta contáctese a soporte.formulario@gmail.com.</div></div></div></div>',
                                attachments: [                                            
                                {   // file on disk as an attachment
                                    filename: 'ok.png',
                                    path: __dirname+'/../../img/ok.png', // stream this file,
                                    cid: 'correcto',
                                }],
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    res.status(404).send({ solicitud: 'no se puede enviar correo',correo:true});
                                }else{
                                    us.save((error, adminStored) => {
                                        if (error) return res.status(500).send({ message: 'Error al registrar', err: true });
                                        if (adminStored) {
                                            res.status(200).send({ message:'registro exitoso', nuevo: true });                                                   
                                        } else {
                                            res.status(404).send({ message: 'No se ha podido registrar', err:true });
                                        }
                                    }); 
                                }
                            })
                        })                                                      
                    }
                })
            }else{
                return res.status(404).send({message:'captcha invalido',captcha:true})
            }
        })
    })                  
}

module.exports = {
    saveContacto,
    savePostulacion
}