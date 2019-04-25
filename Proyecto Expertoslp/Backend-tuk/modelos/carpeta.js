var mongoose= require("mongoose");
// const bcrypt = require('bcrypt-nodejs');

var carpetaSchema =new mongoose.Schema({
   nombre: String,
   fechaCreacion: Date,
   usuarioCreador: mongoose.Schema.Types.Mixed,
   carpetaPadre:  mongoose.Schema.Types.Mixed
 
});

module.exports = mongoose.model('carpetas', carpetaSchema);