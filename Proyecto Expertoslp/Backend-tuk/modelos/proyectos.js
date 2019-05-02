var mongoose= require("mongoose");
// const bcrypt = require('bcrypt-nodejs');

var projectSchema = new mongoose.Schema({
   nombre: String,
   fechaCreacion:Date,
   aHtml:String,
   aCss:String,
   aJs:String,
   usuarioCreador: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('proyectos', projectSchema);