var mongoose= require("mongoose");
// const bcrypt = require('bcrypt-nodejs');

var usuarioSchema =new mongoose.Schema({
   nombre: String,
   apellido: String,
   usuarioName: String,
   email: String,
   password:String,
   fotoPerfil:Buffer,
   carpetascomp: mongoose.Schema.Types.Mixed,
   archivoscomp:mongoose.Schema.Types.Mixed,
   proyectoscomp:mongoose.Schema.Types.Mixed
});

// userSchema.methods.encryptPassword = (password) => {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//  };
 
//  userSchema.methods.comparePassword= function (password) {
//    return bcrypt.compareSync(password, this.password);
//  };
 
 module.exports = mongoose.model('usuario', usuarioSchema);