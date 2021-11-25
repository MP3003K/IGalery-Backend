'use strict'

var express = require('express');
var authcontroller = require('../controllers/authcontroller');
var token = require('../helpers/token');

var application = express.Router();

//application.get('/pruebas-controlador', authcontroller.pruebas);


application.get('/controlador', token.validarTokenDeUsuario , authcontroller.pruebaController);

application.post('/usuario/create', authcontroller.registrarUsuario);

application.post('/usuario/login', authcontroller.validarPasswordDeUsuario);

module.exports = application;