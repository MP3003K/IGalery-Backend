'use strict'

var express = require('express');
var atencionController = require('../controllers/atencionController');
var token = require('../helpers/token');

var application = express.Router();

application.post('/atencion/crear', token.validarTokenDePsicologo , atencionController.crearAtencion);

module.exports = application;