var express = require("express");
var router = express.Router();
var carpetas= require("../modelos/carpeta");
// var id="5cb4aef4bb541517fcd85fd5";


//-------------peticion guardar nueva carpeta------------------------------
router.post("/", function(req, res){
    var p = new carpetas({
        nombre : req.body.nombre,
        fechaCreacion: new Date(),
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
//-------------peticion guardar carpeta hija------------------------------
router.post("/carhija", function(req, res){
    var p = new carpetas({
        nombre : req.body.nombre,
        fechaCreacion: new Date(),
        usuarioCreador: req.body.usuarioCreador,
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
//-------------------obtener todas carpetas------------------------------
router.get("/", function(req,res){
    carpetas.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//
router.get("/:id",function(req,res){
    carpetas.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Peticion para actualizar una carpeta
router.put("/:id",function(req,res){
    carpetas.update(
        {_id:req.params.id},
        {
            nombre : req.body.nombre,
            usuarioCreador: req.body.usuarioCreador,
              carpetaPadre:req.body.carpetaPadre
              
        
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});

//Peticion para eliminar una carpeta
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