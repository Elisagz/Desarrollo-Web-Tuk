var express = require("express");
var router = express.Router();
var mongoose= require("mongoose");
// var bodyParser = require("body-parser");

var usuario= require("../modelos/usuario");


/*-----------------Peticion de registro de usuarios-------------------------
---------------------------------------------------------------------------*/
router.post("/signUp", function(req, res){
    const { nombre, apellido, usuarioName, email, password, fotoPerfil, tipoUsuario} = req.body;
    var p = new usuario({
            nombre,
            apellido,
            usuarioName,//ffff
            email,
            password,
            fotoPerfil,
            tipoUsuario
    });

    // res.redirect()
    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(error);
    });

});

// getusuarios
router.get("/", function(req,res){
    usuario.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//---------------Peticion para obtener las carpetas compartidas--------------
//--------------------------------------------------------------------------
router.get("/:id/carpetas",function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"carpetas",
                localField:"carpetascomp", 
                foreignField:"_id",
                as:"carpetascomp"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        { //Obtener solo el atributo de contactos
            $project:{carpetascomp:1}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

// ----------------peticion para obtener los archivos compartidos---------
//------------------------------------------------------------------------
router.get("/:id/archivos",function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"archivos",
                localField:"archivoscomp", 
                foreignField:"_id",
                as:"archivoscomp"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        { //Obtener solo el atributo de contactos
            $project:{archivoscomp:1}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Obtener un usuario en particular
router.get("/:id",function(req,res){
    usuario.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//------------------Peticion para actualizar un usuario-------------------
//------------------------------------------------------------------------
router.put("/:id",function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
         $set:{
            nombre : req.body.nombre,
            apellido: req.body.apellido,
            // usuarioName:req.body.usuarioName,//ffff
            email :req.body.email,
            password : req.body.password,
            fotoPerfil: req.body.fotoPerfil
            
        }})
        .then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});
//---------------------Peticion para compartir carpeta-----------------------
router.put("/:id/:carpetascomp/carpetas",function(req,res){
    usuario.update(
        {_id:mongoose.Types.ObjectId(req.params.id)},
        {
        $push:{
            carpetascomp: mongoose.Types.ObjectId(req.params.carpetascomp),
        }     
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});
//---------------------Peticion para compartir archivos------------------
router.put("/:id/:archivoscomp/archivos",function(req,res){
    usuario.update(
        {_id:mongoose.Types.ObjectId(req.params.id)},
        {
        $push:{
            archivoscomp: mongoose.Types.ObjectId(req.params.archivoscomp),
        }     
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});
// -------------------Actualizar tipo plan-------------------------
    router.put("/:id/plan",function(req,res){
        usuario.update(
            {_id:req.params.id},
            {
            $set:{
                tipoUsuario:req.body.tipoUsuario
            }}
        ).then(result=>{
            res.send(result);
        })
        .catch(error=>{
            res.send(error);
        });//El primero son los filtros, el segundo son los campos
    });

//Peticion para eliminar un usuario
router.delete("/:id",function(req, res){
    usuario.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;