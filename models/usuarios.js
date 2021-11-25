'use strict'

var moongose = require('mongoose');

var Schema = moongose.Schema;

var UsuariosSchema = Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
});

module.exports = moongose.model('usuarios', UsuariosSchema);
