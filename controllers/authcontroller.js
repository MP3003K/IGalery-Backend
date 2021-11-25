'use strict'

var Usuarios = require('../models/usuarios');
var token = require('../helpers/token');
var bcrypt = require('bcrypt-nodejs');

function pruebaController(req, resp){
    resp.status(200).send({mensaje:"OK 2"});
}

function registrarUsuario(req, resp){
    var nuevoUsuario = new Usuarios();

    var parametros = req.body;

    nuevoUsuario.nombre = parametros.nombre;
    nuevoUsuario.apellidos = parametros.apellidos;
    nuevoUsuario.email = parametros.email;
    
    bcrypt.hash(parametros.password, null, null, function(err, hash){
        nuevoUsuario.password = hash;
    });

    nuevoUsuario.save(
        (err, usuarioGuardado) => {
            if(err){
                resp.status(500).send({message: "No se pudo crear el usuario deseado"});
            }
            else{
                resp.status(200).send({userCreated: usuarioGuardado});
            }
    });

}

function validarPasswordDeUsuario(req, resp){

    var parametros = req.body;

    var emailIngresado = parametros.email;
    var passwordIngresado = parametros.password;

    Usuarios.findOne({email: emailIngresado}, (err, usuarioEncontrado) => {
        if(err || usuarioEncontrado == null){
            resp.status(500).send({message: "No se pudo encontrar el usuario"});
        }
        else{
            bcrypt.compare(passwordIngresado, usuarioEncontrado.password, (err, check)=>{
                if(check){
                    resp.status(200).send({message: "Usuario autenticado", token : token.obtenerTokenDeUsuario(usuarioEncontrado)});
                }
                else{
                    resp.status(403).send({message: "No se pudo autenticar el usuario"});
                }
            });
        }
    });

}

module.exports = {
    pruebaController,
    registrarUsuario,
    validarPasswordDeUsuario
};