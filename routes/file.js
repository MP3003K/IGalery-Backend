'use strict'

var express = require('express');
var multer = require('multer');
var filecontroller = require('../controllers/filecontroller');

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

application.post('/subirimagen', upload.single('imagen'), filecontroller.subirImagen);

application.get('/obtenerimagen/:imagename', filecontroller.retornarImagen);

module.exports = application;