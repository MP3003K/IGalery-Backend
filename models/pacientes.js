'use strict'

var moongose = require('mongoose');

var Schema = moongose.Schema;

var pacientesSchema = Schema({
    
    psicologo : {
        type: Schema.Types.ObjectId,
        ref: 'Psicologo'
    },
    consulta:String,
    condicion:String,
    nombres:String,
    apellidos:String,
    pais_ciudad:String,
    correo:String,
    telefono:String,
    n_sesiones:Number,

    /* Datos adicionales para estudiantes*/
    codigo_universitario:String,
    campus:String,
    edad:String,
    sexo:String,
});
module.exports = moongose.model('pacientes', pacientesSchema);
