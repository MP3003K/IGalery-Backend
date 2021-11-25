'use strict'
var multer = require('multer');
var express = require('express');
var galleryscontroller = require('../controllers/gallerycontroller');
var token = require('../helpers/token');

var application = express.Router();


var storageConfig = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        var prefijo = Date.now() + '-' + Math.round(Math.random() * 1E10);
        cb(null, prefijo + '-' + file.originalname);
    }
});
var upload = multer({storage: storageConfig});


application.post('/gallery/create',upload.single('imagen') , galleryscontroller.crearNewFoto);

application.put('/gallery/edit', token.validarTokenDeUsuario , galleryscontroller.modificarFoto);

application.delete('/gallery/delete', token.validarTokenDeUsuario , galleryscontroller.eliminarFoto);

application.get('/gallery/list', token.validarTokenDeUsuario , galleryscontroller.consultarFotosPorUsuario);

application.get('/gallery/obtenerimagen/:imagename' , galleryscontroller.retornarImagen);

module.exports = application;