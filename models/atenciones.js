'use strict'

var moongose = require('mongoose');

var Schema = moongose.Schema;

var atencionesSchema = Schema({
observaciones:String,
evidencia:String,
n_sesiones:Number,
f_atencion:Date,
derivacion:String,
paciente: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente'
},
psicologo: {
    type: Schema.Types.ObjectId,
    ref: 'Psicologo'
}
});

module.exports = moongose.model('atenciones', atencionesSchema);
