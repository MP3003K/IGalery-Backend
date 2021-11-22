'use strict'

var express = require('express');
var authcontroller = require('../controllers/psicologoController');
var token = require('../helpers/token');

var application = express.Router();

//application.get('/controlador', token.validarTokenDeUsuario , authcontroller.pruebaController);

application.get('/controlador',token.validarTokenDePsicologo, authcontroller.pruebaController);
application.post('/psicologo/validarContrasena', authcontroller.validarPasswordDePsicologo);
application.post('/psicologo/crear', authcontroller.registrarPsicologo);


module.exports = application;