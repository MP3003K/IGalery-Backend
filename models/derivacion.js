'use strict'

var moongose = require('mongoose');

var Schema = moongose.Schema;

var derivacionesSchema = Schema({

    entidad:String,
    condicion:String,
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente'
    }
});
module.exports = moongose.model('derivaciones', derivacionesSchema);
