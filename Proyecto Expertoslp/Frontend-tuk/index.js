var express = require("express");
var session = require("express-session");
var database = require("../Backend-tuk/modules/database");
var usuario= require("../Backend-tuk/modelos/usuario");

var bodyParser = require("body-parser");

    // var mongoose= require("mongoose");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(session({secret:"TUKPROJECT", resave:true, saveUninitialized:true}));
var public = express.static("public");

app.use(function(req,res,next){
        console.log("session: "+ req.session.email);
        if(req.session.email){
            // console.log("Carpeta Privada")
            public(req,res,next);
        }else{
            return next();
        }
    });





app.post("/login", function(req,res){
   usuario.find({email:req.body.email, password:req.body.password})
   .then(data=>{
       console.log("LA DATA");

       console.log(data);
    if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
        
        req.session.idUsuario = data[0]._id;
        req.session.email = data[0].email;
        // var idU=req.session.idUsuario;
        console.log(req.session.idUsuario);
        console.log("usuario loqueado:"+data[0]._id);        
        res.send({status:1,mensaje:"Usuario autenticado con éxito", usuario:data[0]});
    }else{
        console.log("mail logeado")
        console.log(data[0].email);
        res.send({status:0,mensaje:"Credenciales inválidas"});
        
        // req.session.typeUser = data[0].txt_typeUser;
        // console.log("nick"+data[0].txt_nickName);
        // console.log("typo"+data[0].txt_typeUser);
        // console.log("aqui estoy");
    }
    })
    .catch(error=>{
        res.send(error);
    });

});
app.get('/obtenerSesion',function(req, res){
    res.send({email:req.session.email});
})

app.get('/eliminarSession',function(req, res){
    req.session.destroy();
    res.send({logout:1})
})

app.get("/peticionRegistringido",verificarSession,function(req, res){
    res.send("Este es un contenido restringido");
    res.end();
});

function verificarSession(req,res,next){
    if(req.session.email){
        return next();
    }else{
        res.redirect("/index.html");
        /*res.send("Acceso No Autorizado");*/
        // res.end();
    }
}


app.listen(3333,function(){
    console.log("Servidor levantado");
});