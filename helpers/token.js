'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
const { model } = require('mongoose');
var secret = "micontraseñasecreta";

function obtenerTokenDePsicologo(psicologo) {

    var payload = {
        sub: psicologo._id,
        name: psicologo.nombre_completo,
        nid: psicologo.dni,
        iat: moment().unix(),
        exp: moment().add(24, 'hours').unix()
    }

    return jwt.encode(payload, secret);

}

function validarTokenDePsicologo(req, resp, nextStep) {

    var tokenEnviado = req.headers.authorization;

    try {
        var payload = jwt.decode(tokenEnviado, secret);
        req.headers.psicologoID = payload.sub;

        nextStep();
    }
    catch (ex) {
        resp.status(403).send({ message: "Token Inválido" });
    }
}


module.exports = {
    obtenerTokenDePsicologo,
    validarTokenDePsicologo
}