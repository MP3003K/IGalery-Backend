'use strict'

var express = require('express');
var pacienteController = require('../controllers/pacienteController');
var token = require('../helpers/token');

var application = express.Router();

application.post('/paciente/crear', token.validarTokenDePsicologo , pacienteController.crearPaciente);
application.post('/paciente/condicion', token.validarTokenDePsicologo , pacienteController.actualizarCondicion);
application.post('/paciente/agregarPsicologo', token.validarTokenDePsicologo , pacienteController.añadirPsicologo);

module.exports = application;