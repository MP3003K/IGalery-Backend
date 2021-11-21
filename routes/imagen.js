'use strict'

var express = require('express');
var imagenController = require('../controllers/imagenController');


var application = express.Router();
application.post('/imagen/crear', imagenController.CargarImagen);

module.exports = application;