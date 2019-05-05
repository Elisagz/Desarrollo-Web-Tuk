var express = require("express");
var router = express.Router();
var archivos= require("../modelos/archivo");


router.post("/", function(req, res){
    var p = new archivos({
        nombre : req.body.nombre,
        fechaCreacion: new Date(),
        extencion:req.body.extencion,
        contenidoArchivo:req.body.contenidoArchivo,
        usuarioCreador:req.body.usuarioCreador,
        carpetaPadre:null
        
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
router.post("/archivoin", function(req, res){
    var p = new archivos({
        nombre : req.body.nombre,
        fechaCreacion: new Date(),
        extencion:req.body.extencion,
        contenidoArchivo:req.body.contenidoArchivo,
        usuarioCreador:req.body.usuarioCreador,
        carpetaPadre:req.body.carpetaPadre
        
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


router.get("/", function(req,res){
    archivos.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener un usuario en particular
router.get("/:id",function(req,res){
    archivos.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Peticion para actualizar contenidod de un archivo
router.put("/:id",function(req,res){
    archivos.update(
        {_id:req.params.id},
        {
            $set:{
            contenidoArchivo:req.body.contenidoArchivo,
              
         }
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});
//Peticion para actualizar nombre de un archivo
router.put("/:id/rename",function(req,res){
    archivos.update(
        {_id:req.params.id},
        {
            $set:{
            nombre:req.body.nombre
              
         }
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para eliminar un usuario
router.delete("/:id",function(req, res){
   archivos.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;