'use strict'



var Atencion = require('../models/atenciones');
var Pacientes = require('../models/pacientes');

var token = require('../helpers/token');
var bcrypt = require('bcrypt-nodejs');

function crearAtencion(req, resp) {

    var nuevaAtencion = new Atencion();

    var parametros = req.body;
  
    
    nuevaAtencion.observaciones = parametros.observaciones;
    nuevaAtencion.evidencia = parametros.evidencia;
    nuevaAtencion.f_atencion = parametros.f_atencion;
    nuevaAtencion.psicologo = req.headers.psicologoID;
    nuevaAtencion.paciente = parametros.paciente;
    nuevaAtencion.n_sesiones = parametros.n_sesiones;

    nuevaAtencion.save(
        (err, atencionGuardado) => {
            if (err) {
                resp.status(500).send({ message: "No se pudo crear la atencion" });
            }
            else {
                resp.status(200).send({ atencionCreated: atencionGuardado });
            }
        });
}

module.exports = {
    crearAtencion
};
