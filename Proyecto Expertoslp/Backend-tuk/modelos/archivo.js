var mongoose= require("mongoose");
// const bcrypt = require('bcrypt-nodejs');

var archivosSchema = new mongoose.Schema({
   nombre: String,
   fechaCreacion:  Date,
   extencion:Number,
   usuarioCreador: mongoose.Schema.Types.Mixed,
   carpetaPadre: mongoose.Schema.Types.Mixed
 
});

module.exports = mongoose.model('archivos', archivosSchema);