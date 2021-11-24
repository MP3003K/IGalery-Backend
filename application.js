'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var routespsicologo = require('./routes/psicologos');
var routespaciente = require('./routes/paciente');
var routesatencion = require('./routes/atenciones');
var routesImagen = require('./routes/imagen');
var routesfiles = require('./routes/file');
var images =require('./routes/drive-archivos.routes');



var application = express();

const { urlencoded } = require('body-parser');
application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());
application.get('/',function(req, res, next){
    res.send('Bienvenido a Node JS...!');
});
application.use('/api', routespsicologo);
application.use('/api', routespaciente);
application.use('/api', routesatencion);
application.use('/datos',routesImagen );
application.use('/images', images);
application.use(routesfiles);

application.get('/health-check', function (req, resp) {
    resp.status(200).send({ mensaje: "OK" });
})
module.exports = application;