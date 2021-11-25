'use strict'
var moongose = require('mongoose');
const application = require('./application');
moongose.connect('mongodb+srv://admin:admin@oidoamigo-cluster.10ti5.mongodb.net/IGalery?retryWrites=true&w=majority', (err, res) => {
    if (err) {
        console.log('Error BD');
    }
    else {
        console.log('BD conectada');
        application.listen(process.env.PORT || 8585, function () {
            console.log('Servidor iniciado correctamente');
        });
    }
});