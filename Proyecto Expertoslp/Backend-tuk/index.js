var express= require("express");
var database=require("./modules/database");
var usuariosRouter=require('./routers/usuarios-router');
var carpetasRouter=require('./routers/carpetas-router');
var archivosRouter=require('./routers/archivos-router');
var app= express();
var mongoose= require("mongoose");
// var passport = require('passport');
// var flash = require('connect-flash');
// var morgan=require('morgan');
// var cookieParser=require('cookie-parser');
var bodyParser = require("body-parser");
// var session = require('express-session');


var cors = require('cors'); //Cross-Origin Resource Sharing (CORS), Intercambio de recursos de origen cruzado (CORS)



// require('./config/passport')(passport);
//middlewares
app.use(cors());
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extende:true}));
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized:false
//   }));
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(flash());
  app.use("/usuarios", usuariosRouter);
  app.use("/carpetas", carpetasRouter);
  app.use("/archivos", archivosRouter);
//routes
// require('./routers/usuarios-router')(app,passport);


app.listen(3334,function(){
    console.log("Backend en linea");
});