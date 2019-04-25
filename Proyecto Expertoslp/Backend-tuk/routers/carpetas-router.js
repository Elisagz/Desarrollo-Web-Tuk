var express = require("express");
var router = express.Router();
var carpetas= require("../modelos/carpeta");


router.post("/", function(req, res){
    var p = new carpetas({
        nombre : req.body.nombre,
        fechaCreacion: new Date(),
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
    carpetas.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener un usuario en particular
router.get("/:id",function(req,res){
    carpetas.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Peticion para actualizar un usuario
router.put("/:id",function(req,res){
    carpetas.update(
        {_id:req.params.id},
        {
            nombre : req.body.nombre,
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
   carpetas.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;