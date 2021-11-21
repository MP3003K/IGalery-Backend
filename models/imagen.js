'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;
var imagenSchema = Schema({

    nombre: String,
    descripcion: String,
    red: String,
    link: String,
    // implementar posicion

});
module.exports = moongose.model('imagenes', imagenSchema);
