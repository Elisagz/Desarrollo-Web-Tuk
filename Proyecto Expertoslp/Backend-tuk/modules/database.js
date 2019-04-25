var mongoose= require("mongoose");

var servidor = "localhost:27017";
var nombreBaseDatos = "tukdb";

class Database{
    constructor(){
        this.conectar();
    }
    conectar(){
        mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`)
        .then(()=>console.log(`se conecto a la base de datos ${nombreBaseDatos}`))
        .catch(error=>{
           console.error(JSON.stringify(error)) ;
        });
    }

}

module.exports = new Database();

