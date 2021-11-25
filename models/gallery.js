'use strict'

var moongose = require('mongoose');

var Schema = moongose.Schema;


var imageSchema = Schema({
    title: String,
    description:String,
    img: String,

    longitud: String,
    latitud:String,
    altitud:String,

    tipoRed:String,
    
    propietario : {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }  
});

module.exports = moongose.model('images', imageSchema);