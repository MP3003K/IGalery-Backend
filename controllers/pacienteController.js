'use strict'

var Pacientes = require('../models/pacientes');

var token = require('../helpers/token');
var bcrypt = require('bcrypt-nodejs');

function crearPaciente(req, resp){

    var nuevoPaciente = new Pacientes();

    var parametros = req.body;

    nuevoPaciente.consulta = parametros.consulta;
    nuevoPaciente.condicion = parametros.condicion;
    nuevoPaciente.nombres = parametros.nombres;
    nuevoPaciente.apellidos = parametros.apellidos;
    nuevoPaciente.pais = parametros.pais;
    nuevoPaciente.correo = parametros.correo;
    nuevoPaciente.telefono = parametros.telefono;
    nuevoPaciente.n_sesiones = parametros.n_sesiones;
    nuevoPaciente.psicologo = null;

    nuevoPaciente.save(
        (err, PacienteGuardado) => {
            if(err){
                resp.status(500).send({message: "No se pudo crear el Paciente"});
            }
            else{
                resp.status(200).send({pacienteCreado: PacienteGuardado});
            }
    });
}



function actualizarCondicion(req, resp){

    var parametros = req.body;

    Pacientes.findByIdAndUpdate(parametros._id, {
        condicion: parametros.condicion,
        
    }, function(err, PacienteActualizado){
        if(err){
            resp.status(500).send({message: "No se pudo modificar el paciente"});
        }
        else{
            resp.status(200).send({pacienteUpdated: PacienteActualizado});
        }

    }) ;


}

function añadirPsicologo(req, resp){

    var parametros = req.body;
    Pacientes.findByIdAndUpdate(parametros._id, {
        psicologo: req.headers.psicologoID,
        
    }, function(err, PacienteActualizado){
        if(err){
            resp.status(500).send({message: "No se pudo modificar el paciente"});
        }
        else{
            resp.status(200).send({pacienteUpdated: PacienteActualizado});
        }

    }) ;


}

module.exports = {
    crearPaciente,
    actualizarCondicion,
    añadirPsicologo
};