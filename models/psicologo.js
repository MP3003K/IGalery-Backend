'use strict'

var moongose = require('mongoose');

var Schema = moongose.Schema;

var PsicologoSchema = Schema({
    dni:String,
    contraseña:String,
    nombre_completo:String,
    correo:String,
    n_p_terminados:Number,
    n_p_inconclusos:Number
});
module.exports = moongose.model('psicologo', PsicologoSchema);
