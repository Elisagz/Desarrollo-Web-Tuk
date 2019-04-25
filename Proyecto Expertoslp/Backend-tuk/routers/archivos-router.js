var express = require("express");
var router = express.Router();
var archivos= require("../modelos/archivo");


router.post("/", function(req, res){
    var p = new archivos({
        nombre : req.body.nombre,
        fechaCreacion: new Date(),
        extencion:req.body.extencion,
        usuarioCreador:{
          _id: req.body.usuarioCreador

        },
        carpetaPadre:{
            _id: req.body.carpetaPadre
        }
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


//Peticion para actualizar un usuario
router.put("/:id",function(req,res){
    archivos.update(
        {_id:req.params.id},
        {
            nombre : req.body.nombre,
            extencion: req.body.extencion,
            usuarioCreador:{
                _id: req.body.usuarioCreador
      
              },
              carpetaPadre:{
                  _id: req.body.carpetaPadre
              }
        
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
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