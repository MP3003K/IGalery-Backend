'use strict'
var Imagen = require('../models/imagen');
function CargarImagen(req, resp) {

    var nuevaImagen = new Imagen();

    var parametros = req.body;
  
    
    nuevaImagen.nombre = parametros.nombre;
    nuevaImagen.descripcion = parametros.descripcion;
    nuevaImagen.red = parametros.red;
    nuevaImagen.link = parametros.link;


    nuevaImagen.save(
        (err, imagenGuardada) => {
            if (err) {
                resp.status(500).send({ message: "No se pudo crear la imagen" });
            }
            else {
                resp.status(200).send({ imagenCreada: imagenGuardada });
            }
        });
}
module.exports = {
 CargarImagen
};
