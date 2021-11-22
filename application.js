'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var routespsicologo = require('./routes/psicologos');
var routespaciente = require('./routes/paciente');
var routesatencion = require('./routes/atenciones');
var routesImagen = require('./routes/imagen');


var application = express();

const { urlencoded } = require('body-parser');
application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());

application.use('/api', routespsicologo);
application.use('/api', routespaciente);
application.use('/api', routesatencion);
application.use('/datos',routesImagen );
application.get('/health-check', function (req, resp) {
    resp.status(200).send({ mensaje: "OK" });
})
module.exports = application;