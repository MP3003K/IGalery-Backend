'use strict'

var Psicologo = require('../models/psicologo');
var token = require('../helpers/token');
var bcrypt = require('bcrypt-nodejs');

function pruebaController(req, resp){
    resp.status(200).send({mensaje:"Token Verificado"});
}

function registrarPsicologo(req, resp){
    var nuevoPsicologo = new Psicologo();

    var parametros = req.body;

    nuevoPsicologo.nombre_completo = parametros.nombre_completo;
    nuevoPsicologo.dni = parametros.dni;
    nuevoPsicologo.correo = parametros.correo;
    nuevoPsicologo.n_p_terminados=parametros.n_p_terminados;
    nuevoPsicologo.n_p_inconclusos=parametros.n_p_inconclusos;


    bcrypt.hash(parametros.contraseña, null, null, function(err, hash){
        nuevoPsicologo.contraseña = hash;
    });

    nuevoPsicologo.save(
        (err, psicologoGuardado) => {
            if(err){
                resp.status(500).send({message: "No se pudo crear el psicologo"});
            }
            else{
                resp.status(200).send({PsicologoCreado: psicologoGuardado});
            }
    });

}

function validarPasswordDePsicologo(req, resp){

    var parametros = req.body;

    var dniIngresado = parametros.dni;
    var contraseñaIngresado = parametros.contraseña;

    Psicologo.findOne({dni: dniIngresado}, (err, psicologoEncontrado) => {
        if(err || psicologoEncontrado == null){
            resp.status(500).send({message: "No se pudo encontrar el psicologo"});
        }
        else{
            bcrypt.compare(contraseñaIngresado, psicologoEncontrado.contraseña, (err, check)=>{
                if(check){
                    resp.status(200).send({message: "Psicologo autenticado", token : token.obtenerTokenDePsicologo(psicologoEncontrado)});
                }
                else{
                    resp.status(403).send({message: "No se pudo autenticar el psicologo"});
                }
            });
        }
    });

}

module.exports = {
    pruebaController,
    registrarPsicologo,
    validarPasswordDePsicologo
};