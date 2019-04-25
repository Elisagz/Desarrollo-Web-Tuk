// const router = require('express').Router();
// const passport = require('passport');

// router.get('/', (req, res, next) => {
// //   res.render('index');
// });

// // router.get('/signup', (req, res, next) => {
// //   res.render('signup');
// // });

// router.post('/signup', passport.authenticate('local-signup', {
// //   successRedirect: '/profile',
// //   failureRedirect: '/signup',
//   failureFlash: true
// })); 

// // router.get('/signin', (req, res, next) => {
// // //   res.render('signin');
// // });


// router.post('/signin', passport.authenticate('local-signin', {
// //   successRedirect: '/profile',
// //   failureRedirect: '/signin',
//   failureFlash: true
// }));

// // router.get('/profile',isAuthenticated, (req, res, next) => {
// //   res.render('profile');
// // });

// // router.get('/logout', (req, res, next) => {
// //   req.logout();
// //   res.redirect('/');
// // });


// function isAuthenticated(req, res, next) {
//   if(req.isAuthenticated()) {
//     return next();
//   }

//   res.redirect('/')
// }

// module.exports = router;



var express = require("express");
var router = express.Router();
// var bodyParser = require("body-parser");

var usuario= require("../modelos/usuario");
var passport = require('passport');

// SIGN UP
router.post("/signUp", function(req, res){
    const { nombre, apellido, usuarioName, email, password, fotoPerfil} = req.body;
    var p = new usuario({
            nombre,
            apellido,
            usuarioName,//ffff
            email,
            password,
            fotoPerfil
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

// getantiguo
router.get("/", function(req,res){
    usuario.find()
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

//SignIN prev
// router.post("/signIn", passport.authenticate('local',{

// }));
//Peticion para actualizar un usuario
router.put("/:id",function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            nombre : req.body.nombre,
            apellido: req.body.apellido,
            usuarioName:req.body.usuarioName,//ffff
            email :req.body.email,
            password : req.body.password,
            fotoPerfil: req.body.fotoPerfil
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
    usuario.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;