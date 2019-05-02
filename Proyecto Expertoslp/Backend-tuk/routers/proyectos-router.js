var express = require("express");
var router = express.Router();
var proyecto= require("../modelos/proyectos");

//-------------peticion guardar nuevo proyecto------------------------------
router.post("/", function(req, res){
    var p = new proyecto({
        nombre : req.body.nombre,
        fechaCreacion: new Date(),
        aHtml:req.body.aHtml,
        aCss:req.body.aCss,
        aJs:req.body.aJs,
        usuarioCreador:req.body.usuarioCreador    
        
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

//-------------------obtener todos lo proyectos que el usuario tiene en su------------------------------
router.get("/", function(req,res){
    proyecto.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
//----------------obtener un proyecto------------------------------------------
router.get("/:id",function(req,res){
    proyecto.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

// ------------------obtener una busqueda de los proyectos por usuario creador---------
router.get("/:id/buscar", function(req,res){
    proyecto.find({usuarioCreador:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
// -----------------peticion para actualizar un proyecto------------------------
router.put("/:id",function(req,res){
    proyecto.update(
        {_id:req.params.id},
        {
        $set:{
            aHtml:req.body.aHtml,
            aCss: req.body.aCss,
            aJs: req.body.aJs,
        }}
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});

//-----------------------------------------------------------------------------
//Peticion para eliminar un usuario
router.delete("/:id",function(req, res){
    proyecto.remove({_id:req.params.id})
     .then(data=>{
         res.send(data);
     })
     .catch(error=>{
         res.send(error);
     });
 });
 



module.exports = router;