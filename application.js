'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var routesImagen = require('./routes/imagen');

var application = express();

const { urlencoded } = require('body-parser');
application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());

application.use('/datos',routesImagen );
application.get('/health-check', function (req, resp) {
    resp.status(200).send({ mensaje: "OK" });
})
module.exports = application;