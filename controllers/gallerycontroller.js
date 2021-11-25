'use strict'

var Gallery = require('../models/gallery');

function crearNewFoto(req, resp) {

    var nuevaFoto = new Gallery();

    var parametros = req.body;
    var nombreUrl = req.file.filename;

    nuevaFoto.title = parametros.title;
    nuevaFoto.description = parametros.description;
    nuevaFoto.img = nombreUrl;
    nuevaFoto.propietario = req.headers.userId;

    nuevaFoto.longitud = parametros.longitud;
    nuevaFoto.latitud = parametros.latitud;
    nuevaFoto.altitud = parametros.altitud;

    nuevaFoto.tipoRed = parametros.tipoRed;

console.log('----------------Variables----------------------');
console.log(nuevaFoto);
console.log('-----------------------------------------------');

nuevaFoto.save(
        (err, fotoGuardado) => {
            if (err) {
                resp.status(500).send({ message: "No se pudo crear la foto" });
            }
            else {
                resp.status(200).send({ contactCreated: fotoGuardado });
            }
        });
}

function modificarFoto(req, resp) {

    var parametros = req.body;

    Gallery.findByIdAndUpdate(parametros._id, {
        title: parametros.title,
        description: parametros.description,
    }, function (err, fotoActualizado) {
        if (err) {
            resp.status(500).send({ message: "No se pudo modificar la foto" });
        }
        else {
            resp.status(200).send({ contactUpdated: fotoActualizado });
        }

    });


}

function eliminarFoto(req, resp) {
    var parametros = req.body;
    Gallery.findByIdAndDelete(parametros._id, function (err, fotoEliminado) {
        if (err) {
            resp.status(500).send({ message: "No se pudo eliminar la foto" });
        }
        else {
            resp.status(200).send({ contactDeleted: fotoEliminado });
        }
    });

}

function consultarFotosPorUsuario(req, resp) {

    Gallery.find({ propietario: req.headers.userId }, (err, fotosEncontrados) => {
        if (err) {
            resp.status(500).send({ message: "No se pudo consultar las fotos" });
        }
        else {
            resp.status(200).send({ contactList: fotosEncontrados });
        }
    });

}

module.exports = {
    crearNewFoto,
    modificarFoto,
    eliminarFoto,
    consultarFotosPorUsuario
};