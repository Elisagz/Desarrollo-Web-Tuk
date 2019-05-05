

var idpadre=null;
var arrex=[".html",".js",".css"];
var arrima=["../img/html21.png","../img/js21.png","../img/css21.png"]; 
var uSession={
            id:"",
            nombre:"",
            email:"",
            tipoUsuario:""
        };

var idUsuarioC;
var idItemslc;
var nameItem;
var idProyectoActual;
var conteo2;
var padres=[];
var contador=1;
var nomcarpeta;
$(function() {
        $.contextMenu({
            selector: '.context-menu-one', 
            callback: function(key, options) {
                var m = "clicked: " + key;
                
                if(this.attr("name")=="carpeta"){
                    nameItem="carpeta"
                }
                if(this.attr("name")=="archivo"){
                   nameItem="archivo"
                }
                if(this.attr("name")=="proyecto"){
                 nameItem="proyecto"
              }
                if(key=="compartir"){
                    $('#Modalcompartir').modal('show'); 
                   idItemslc= this.attr("id");

                   console.log(idItemslc);
                   console.log(nameItem)
                   
                }
                if(key=="eliminar"){
                        idItemslc= this.attr("id");
                        eliminarItem();
                        console.log(idItemslc);
                        console.log(nameItem)
                    }
                if(key=="renombrar"){
                    idItemslc= this.attr("id");
                    $('#modalRename').modal('show');
                }
                
               
            },
            items: {
                "eliminar": {name: "Eliminar", icon: "delete"},
                "compartir": {name: "Compartir", icon: "copy"},
                "renombrar": {name: "Renombrar", icon: "edit"},
                // "paste": {name: "Paste", icon: "paste"},
                // "delete": {name: "Delete", icon: "delete"},
                // "sep1": "---------",
                // "quit": {name: "Quit", icon: function(){
                //     return 'context-menu-icon context-menu-icon-quit';
                // }}
            }
        });

        $('.context-menu-one').on('click', function(e){
            console.log('clicked', this);
        //    console.log(this.id)
        }) 
           
    });
    
  

$(document).ready(function(){
            obtenerSession();
            // $("#imagen-contacto").attr("src",urlImagen);
		   
            // console.log("id sesion")
            // console.log(id);
            
            
            console.log("arreglo sesion")
            console.log(uSession)
              
            
            // --------------CLICK AL PERFIL----------------
            $("#perfilUs").click(function(){
                $.ajax({  
                    url: 'perfil.html',  
                    success: function(data) {  
                        document.getElementById('contenedort').innerHTML=data;
                        cargardata();  
                    }  
                }); 
                });
            $("#salir").click(function(){
                cerrarSession();
            });

            $("#compartidos").click(function(){
               
                padres=[];
                contador=1;
                bti=""
                cargarCompartidos();
                
            });

            $("#suscripciones").click(function(){
                if(uSession.tipoUsuario==1){
                    plan="Gratis"
                }
                    
                if(uSession.tipoUsuario==2){
                    plan="Basico"   
                }
                if(uSession.tipoUsuario==3){
                   plan="Pro"
                }
                $("#contenedort").html("");
                $("#contenedort").append(`
                <br>
                <div class="row">
                    <div class="containernav col-12">
                        <nav class="navbar navbar-expand-sm navbar-light bg-light">
                        <span class="navbar-text">
                        
                        <div class="text-center"><h5 class="config">Actualmente estas suscrito al plan: <b id="nomplan">${plan}</b></h5></span>
                        </div>
                        </nav>
                    </div>
                </div>
                <br>
                <div class="row mx-4">
                    <div class="col-md-4 text-center animate-box mb-3">
                            <div class="pricing">
                            <h2 class="pricing-heading">Gratis</h2>
                            <div class="price"><sup class="currency">$</sup>0<small>Para siempre</small></div>
                            <br>
                         <ul  class="text-center">
                            <li><i class="icon-check"></i> Compartir con otros usuarios</li>
                             <hr class="hr2">
                            <li><i class="icon-check"></i>Carpetas ilimitadas</li>
                             <hr class="hr2">
                            <li><i class="icon-check"></i><strong>1</strong> Proyecto</li>
                    
                        </ul>
                
                    <p><button  data-target="#exampleModalplanGratis" data-toggle="modal" id="planGratis" class="btn btn-primary">Select Plan</button></p>
                </div>
            </div>
        <div class="col-md-4 text-center animate-box mb-3">
                <div class="pricing">
                    <h2 class="pricing-heading">Basico</h2>
                    <div class="price"><sup class="currency">$</sup>27<small>por mes</small></div>
                    <br>
                    <ul  class="text-center">
                            <li><i class="icon-check"></i> Compartir con otros usuarios</li>
                            <hr class="hr2">
                            <li><i class="icon-check"></i>Carpetas ilimitadas</li>
                            <hr class="hr2">
                            <li><i class="icon-check"></i><strong>10</strong> Proyectos</li>
                       
                       </ul>
                    <p><button data-target="#exampleModalplan" data-toggle="modal" id="planPago1" class="btn btn-primary">Select Plan</button></p>
                </div>
            </div>
            <div class="col-md-4 text-center animate-box mb-3">
                    <div class="pricing">
                        <h2 class="pricing-heading">Pro</h2>
                        <div class="price"><sup class="currency">$</sup>74<small>por mes</small></div>
                        <br>
                        <ul class="text-center">
                                <li><i class="icon-check"></i>Compartir con otros usuarios</li>
                                <hr class="hr2">
                                <li><i class="icon-check"></i>Carpetas ilimitadas</li>
                                <hr class="hr2">
                                <li><i class="icon-check"></i><strong>50</strong> Proyectos</li>
                           
                           </ul>
                        <p><button data-target="#exampleModalplanpro" data-toggle="modal" id="planPago2" class="btn btn-primary">Select Plan</button></p>
                    </div>
                </div>
        </div>`)
                    
                if(uSession.tipoUsuario==1){
                 $("#planGratis").attr("disabled",true);
                }
                    
                if(uSession.tipoUsuario==2){
                   $("#planPago1").attr("disabled",true);    
                }

                if(uSession.tipoUsuario==3){
                    $("#planPago2").attr("disabled",true);
                }
        })

        // ----------------CLICK A MI UNIDAD--------------
            $("#miunidad").click(function(){
               padres=[];
               contador=1;
               bti=""
                cargarmiunidad();
                });  
                

         
              
 
 });
// -----------------FUNCIONES DASHBOARD---------------

function cargarmiunidad(){
    $("#contenedort").html("")
    $("#contenedort").append(`
    <div class="row">
        <div class="containernav col-12">
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <span class="navbar-text" id="titulonav">
            <a onclick="atras()"><i class="fas fa-home estil"></i></a>
            <span id="tit"><b>Mi unidad</b></span>
            </span>
            </nav>
        </div>
    </div>
    <hr>
    <h6>Carpetas</h6>
    <div class="row spacefiles justify-content-start mt-3" id="carpeta"> 
    </div>
    <br>
    <h6>Archivos</h6>
    <div class="row spacefiles justify-content-start mt-3" id="archivos">
    </div>
    <br>
    <h6>Proyectos</h6>
    <div class="row spacefiles justify-content-start mt-3" id="proj">
    </div>
    `)
      
    obtenerCarpetas();
    obtenerArchivos();  
    obtenerProyectos();
    idpadre=null;
    console.log("valor del id padre" );
    console.log(idpadre );                 
             };

function cargarCompartidos(){
    $("#contenedort").html("");
    $("#contenedort").append(`
    <div class="row">
        <div class="containernav col-12">
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <span class="navbar-text" id="titulonav">
            <a onclick="atras()"><i class="fas fa-user-friends estil"></i></a>
            <span id="tit"><b>Compartidos</b></span>
            </span>
            </nav>
            </div>
        </div>
    </div>
    <div class="row spacefiles justify-content-start mt-3" id="cont"> 
    </div>
    `)
    obtenerCarpetasCompartida();
    obtenerArchivosCompartidos();
    obtenerProyectosCompartidos();
}
function alertaexito(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000
    });
    
    Toast.fire({
        type: 'success',
        title: 'Creado exitosamente'
    })
}
function alertaborrado(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000
    });
    
    Toast.fire({
        type: 'success',
        title: 'Borrado  exitosamente'
    })
}
function compartirI(){
    $.ajax({  
    url:"http://localhost:3334/usuarios",
    method:"get",
     dataType:"json",
     success: function(respuesta){
         var correo=$("#correocompartir").val()
         
        for (let i = 0; i < respuesta.length; i++) {
            if(respuesta[i].email==correo){
                idUsuarioC=respuesta[i]._id;
                console.log(idUsuarioC);
            }
            
        }
        if(nameItem=="carpeta"){

        $.ajax({
            url:`http://localhost:3334/usuarios/${idUsuarioC}/${idItemslc}/carpetas`,
            method:"put",
            dataType:"json",
            success:function(res){
                    console.log("compartio bien");
            },
            error:function(error){
                console.log(error);
            }
        })
    }
    if(nameItem=="archivo"){
        $.ajax({
            url:`http://localhost:3334/usuarios/${idUsuarioC}/${idItemslc}/archivos`,
            method:"put",
            dataType:"json",
            success:function(res){
                    console.log("compartio bien");
            },
            error:function(error){
                console.log(error);
            }
        })
    }
    if(nameItem=="proyecto"){
        $.ajax({
            url:`http://localhost:3334/usuarios/${idUsuarioC}/${idItemslc}/proyectos`,
            method:"put",
            dataType:"json",
            success:function(res){
                    console.log("compartio bien");
                    console.log(res)
            },
            error:function(error){
                console.log("compartio bien");
                console.log(error);
            }
        })
    }
    },
      error:function(error){
          console.log(error);
       }
     });
}

function ponernombreplan(tipoUsuario){
    if(tipoUsuario==1){
        $("#nomplan").text("Gratis");
       }
           
       if(tipoUsuario==2){
        $("#nomplan").text("Basico");    
       }

       if(tipoUsuario==3){
        $("#nomplan").text("Pro");
       }
}
function alertcambio(){
    Swal.fire({
        type: 'info',
        title: 'Cambio de Plan',
        text: 'Cambio de plan actualizado'
       
      })
}

$("#suscribirse1").click(function(){
    $("#planPago1").attr("disabled",true);
    $("#planGratis").attr("disabled",false);
    $("#planPago2").attr("disabled",false);
    uSession.tipoUsuario=2;
    tipoUsuario=uSession.tipoUsuario
    ponernombreplan(tipoUsuario);
    var campos={tipoUsuario};
    $.ajax({  
        url:"http://localhost:3334/usuarios/"+uSession.id+"/plan",
        method:"put",
        data:campos,
        dataType:"json",
         success: function(res){
            console.log(res);
            alertcambio();
            console.log("se actualizo el usuario");
            

         },
         error:function(error){
            console.log(error);
         }
});  
})
$("#suscribirse2").click(function(){
    $("#planPago2").attr("disabled",true);
    $("#planPago1").attr("disabled",false);
    $("#planGratis").attr("disabled",false);
    uSession.tipoUsuario=3;
    tipoUsuario=uSession.tipoUsuario
    ponernombreplan(tipoUsuario);
   var campos={tipoUsuario};
    $.ajax({  
        url:"http://localhost:3334/usuarios/"+uSession.id+"/plan",
        method:"put",
        data:campos,
        dataType:"json",
         success: function(res){
            console.log(res);
            alertcambio();
            console.log("se actualizo el usuario");
            

         },
         error:function(error){
            console.log(error);
         }
});
    
})
$("#suscribirse0").click(function(){
    $("#planPago2").attr("disabled",false);
    $("#planPago1").attr("disabled",false);
    $("#planGratis").attr("disabled",true);
    // limiteProyecto=1;
    uSession.tipoUsuario=1;
    tipoUsuario=uSession.tipoUsuario
    ponernombreplan(tipoUsuario);
    var campos={tipoUsuario};
    $.ajax({  
        url:"http://localhost:3334/usuarios/"+uSession.id+"/plan",
        method:"put",
        data:campos,
        dataType:"json",
         success: function(res){
            console.log(res);
            alertcambio();
            console.log("se actualizo el usuario");
            

         },
         error:function(error){
            console.log(error);
         }
});
})


// function tipoPlan(){
//     var tipo=uSession.tipoUsuario;
//     campos={tipo};
//     $.ajax({  
//         url:"http://localhost:3334/usuarios/"+uSession.id+"/plan",
//         method:"put",
//         data:campos,
//         dataType:"json",
//          success: function(res){
//             console.log(res);
//             console.log("se actualizo el usuario");
            

//          },
//          error:function(error){
//             console.log(error);
//          }
// });
// }


//---------------------Funciones de session---------------------------------------
function obtenerSession(){
    $.ajax({  
        url:"http://localhost:3333/obtenerSesion",
        method:"get",
         dataType:"json",
         success: function(res){
            // console.log(res);
            $.ajax({  
                url:"http://localhost:3334/usuarios",
                method:"get",
                 dataType:"json",
                 success: function(respuesta){
                     console.log(res.email);
                    for (let i = 0; i < respuesta.length; i++) {
                        if(respuesta[i].email==res.email){
                            uSession.id=respuesta[i]._id;
                            uSession.nombre=respuesta[i].nombre;
                            uSession.email=respuesta[i].email;
                            uSession.tipoUsuario=respuesta[i].tipoUsuario;
                            $("#nombreperfil").html(`  `+uSession.nombre);
                        }
                        
                    }           
                    console.log(uSession);
                    cargarmiunidad();
                      },
                  error:function(error){
                      console.log(error);
                   }
                 });
                 
              },
          error:function(error){
              console.log(error);
           }
         });

         
        
}

 
function cerrarSession(){
    $.ajax({  
        url:"http://localhost:3333/eliminarSession",
        method:"get",
         dataType:"json",
         success: function(res){
            console.log("se elimino la session")
            window.location.href="/login.html" 
              },
          error:function(error){
              console.log(error);
           }
         });

        
}

// ----------funciones para abrir carpetas y proyectos---------------------------
var bti="";
function obtenername(nombre,idc){
    bti+=nombre+`/`;
    console.log("valor de bti")
    console.log(bti)
    
    $("#contenedort").html("");
    $("#contenedort").append(`
    <div class="row">
        <div class="containernav col-12">
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <span class="navbar-text" id="titulonav">
            <a onclick="atras()"><i class="fas fa-arrow-circle-left estil"></i></a>
            <span id="tit"><b>Mi unidad/</b>${bti}</span>
            </span>
            </nav>
        </div>
    </div>
    <div class="row tamano spacefiles justify-content-start mt-3" id="contenido"> 
      </div>
    `)
    
    // document.getElementById('tit').innerHTML +=`/`+nomcarpeta;
    console.log("cargo dentro de carpeta" );
    console.log(`valor del id de carpeta  `+idc);
    idpadre=idc;
    padres.push(idpadre);
    console.log("arreglo de padres")
    console.log(padres)
    obtenerCarpetashijas(idc);
    obtenerArchivoshijos(idc);
    console.log("id padre");
    console.log(idpadre);
} 

function obtenernameC(nombre,idc){
    bti+=nombre+`/`;
    console.log("valor de bti")
    console.log(bti)
    $("#contenedort").html("");
    $("#contenedort").append(`
    <div class="row">
        <div class="containernav col-12">
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <span class="navbar-text" id="titulonav">
                <a onclick="atras2()"><i class="fas fa-arrow-circle-left estil"></i></a>
                <span id="tit"><b>Compartidos/</b>${bti}</span>
                </span>
            </nav>
        </div>
    </div>
    <div class="row tamano spacefiles justify-content-start mt-3" id="cont"> 
      </div>
    `)
    console.log("cargo dentro de carpeta" );
    console.log(`valor del id de carpeta  `+idc);
    idpadre=idc;
    padres.push(idpadre);
    console.log("arreglo de padres")
    console.log(padres)
    obtenerCarpetashijasC(idc);
    obtenerArchivoshijos(idc);
    obtenerArchivoshijosC(idc);
    obtenerProyectosCompartidos();
    console.log("id padre");
    console.log(idpadre);
   
}
 function abrircarpeta(e,idc){
    e.preventDefault();
    $.ajax({
        url:"http://localhost:3334/carpetas/"+idc,
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("encontrado");
            console.log(res);
            console.log("nombre carpeta")
            obtenername(res[0].nombre,idc);
        },
        error:function(error){
            console.log(error);
         }
       });
   
   
}
function abrircarpetaC(e,idc){

    e.preventDefault();
    $.ajax({
        url:"http://localhost:3334/carpetas/"+idc,
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("encontrado");
            console.log(res);
            console.log("nombre carpeta")
            obtenernameC(res[0].nombre,idc);
        },
        error:function(error){
            console.log(error);
         }
       });
   
};


function pasarVariables(pagina, nombres) {
    pagina +="?";
    // nomVec = nombres.split(",");
    // for (i=0; i<nomVec.length; i++)
      pagina += nombres+"&";
    pagina = pagina.substring(0,pagina.length-1);
    location.href=pagina;
  }

function atras(){
    console.log("padre en la funcion atras");
    console.log(idpadre);
    
    // $("#contenedort").html("");
    if(idpadre==null){
        cargarmiunidad();
    }
    if(idpadre!=null){
        // pa.push(idpadre);
        // console.log(padres);
        caracter="/"
        var arrayDeCadenas = bti.split(caracter);
        bti="";
        console.log(arrayDeCadenas);
        for (let i = 0; i < arrayDeCadenas.length-2; i++) {
            bti += arrayDeCadenas[i] +`/`;
            
        }
         $("#contenedort").html("");
         $("#contenedort").append(`
         <div class="row">
            <div class=" containernav col-12">
                <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <span class="navbar-text">
                <a onclick="atras()"><i class="fas fa-arrow-circle-left estil"></i></a>
                <span id="tit"><b>Mi unidad</b>${bti}</span>
                </span>
                </nav>
            </div>
        </div>
            <div class="row spacefiles justify-content-start mt-3" id="contenido"> 
            </div>
            `)
        console.log(`bti en atras`+bti) 
        console.log("el valor del padre aqui");
        console.log(idpadre);
        
        valor=padres.length;
       contador+=1;
       console.log(contador);
       console.log(padres);
       obtenerCarpetashijas(padres[valor-contador]);
       obtenerArchivoshijos(padres[valor-contador]);
    
    }
    } 
function atras2(){
        console.log("padre en la funcion atras");
        console.log(idpadre);
        
        // $("#contenedort").html("");
        if(idpadre==null){
            cargarCompartidos();
        }
        if(idpadre!=null){
            // pa.push(idpadre);
            // console.log(padres);
            caracter="/"
            var arrayDeCadenas = bti.split(caracter);
            bti="";
            console.log(arrayDeCadenas);
            for (let i = 0; i < arrayDeCadenas.length-2; i++) {
                bti += arrayDeCadenas[i] +`/`;
                
            }
             $("#contenedort").html("");
             $("#contenedort").append(`
             <div class="row">
                    <div class=" containernav col-12">
                        <nav class="navbar navbar-expand-sm navbar-light bg-light">
                        <span class="navbar-text">
                        <a onclick="atras2()"><i class="fas fa-arrow-circle-left estil"></i></a>
                        <span id="tit"><b>Compartidos/</b>${bti}</span>
                        </span>
                        </nav>
                    </div>
                </div>
                <div class="row spacefiles justify-content-start mt-3" id="cont"> 
                </div>
                `)
            console.log(`bti en atras`+bti) 
            console.log("el valor del padre aqui");
            console.log(idpadre);
            
            valor=padres.length;
           contador+=1;
           console.log(contador);
           console.log(padres);
           obtenerCarpetashijasC(padres[valor-contador]);
           obtenerArchivoshijosC(padres[valor-contador]);
        
        }
        } 

//-----------------CARGAR PERFIL----------------
function cargardata(){
    $.ajax({  
        url:"http://localhost:3334/usuarios/"+ uSession.id,
        method:"get",
         dataType:"json",
         success: function(res){
            console.log(res);
            console.log("se encontro el usuario");

           llenarinputs(res);
           
              },
          error:function(error){
              console.log(error);
           }
         });

        }; 

function cargardata2(){
               $("#nombre").text($("#nombrem").val());  
                $("#apellido").text($("#apellidom").val()); 
                $("#correo").text($("#correom").val());        
                // $("#password").text($("#passwordm").val());
                $("#guardarp").attr("disabled",false);
        }
   
// -----------------------FUNCIONES CARPETAS-------------------------
function obtenerCarpetas(){
    $.ajax({
        url:"http://localhost:3334/carpetas",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            // console.log("carpeta padre");
            for (var i = 0; i < res.length; i++) {
            if(res[i].usuarioCreador==uSession.id){
                console.log(res[i].usuarioCreador)
            // console.log(res[i].carpetaPadre._id);
            if(res[i].carpetaPadre==null){
                // console.log("id");
                idpadre=res[i].carpetaPadre
               
                // generarItems(res[i]);

                $("#carpeta").append(
                    `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="carpeta" id="${res[i]._id}" >
                    <a href="#" ondblclick="abrircarpeta(event, '${res[i]._id}')" class="c"><div class="carpet3">
                        <i class="fas fa-folder fol2"></i>
                    <span class="row justify-content-center etiqueta2 px-auto">${res[i].nombre}</span>
                
                    </div></a> 
                 
                </div>`); 
            
        }
    }
           } 
           

        },
        error:function(error){
            console.log(error);
        }
    });
};
function obtenerCarpetashijas(idc){
    $.ajax({
        url:"http://localhost:3334/carpetas",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                // idpadre=res[i].carpetaPadre;
                
                if(res[i].usuarioCreador==uSession.id){
                // console.log(res[i].carpetaPadre._id);
                if(res[i].carpetaPadre==idc){
                    
                    // console.log("padre dentro de obtener hijas");
                    // console.log(idpadre);
                    // generarItems(res[i]);
                    $("#contenido").append(
                        `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="carpeta" id="${res[i]._id}">
                        <a href="#" ondblclick="abrircarpeta(event, '${res[i]._id}')" class="c"><div class="carpet3">
                            <i class="fas fa-folder fol2"></i>
                        <span class="row justify-content-center etiqueta2 px-auto">${res[i].nombre}</span>
                    </div></a>    
                    </div>`); 
                }
            }
               }   
        },
        error:function(error){
            console.log(error);
        }
    });
}

function obtenerCarpetashijasC(idc){
    $.ajax({
        url:"http://localhost:3334/carpetas",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                // idpadre=res[i].carpetaPadre;
                // if(res[i].usuarioCreador==uSession.id){
                // console.log(res[i].carpetaPadre._id);
                if(res[i].carpetaPadre==idc){
                    // console.log("padre dentro de obtener hijas");
                    // console.log(idpadre);
                    // generarItems(res[i]);
                    $("#cont").append(
                        `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="carpeta" id="${res[i]._id}">
                        <a href="#" ondblclick="abrircarpetaC(event, '${res[i]._id}')" class="c"><div class="carpet3">
                            <i class="fas fa-folder fol2"></i>
                        <span class="row justify-content-center etiqueta2 px-auto">${res[i].nombre}</span>
                    </div></a>    
                    </div>`); 
                
            }
               }   
        },
        error:function(error){
            console.log(error);
        }
    });
}
function obtenerCarpetasCompartida(){
    $.ajax({
        url:`http://localhost:3334/usuarios/${uSession.id}/carpetas`,
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            for (var i = 0; i < res[0].carpetascomp.length; i++) {
                console.log("id carpetacompartida")
                console.log(res[0].carpetascomp[i]._id);
                    $("#cont").append(
                        `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="carpeta" id="${res[0].carpetascomp[i]._id}>
                        <a href="#" ondblclick="abrircarpetaC(event, '${res[0].carpetascomp[i]._id}')"class="c"><div class="carpet3">
                            <i class="fas fa-folder fol2"></i>
                        <span class="row justify-content-center etiqueta2 px-auto">${res[0].carpetascomp[i].nombre}</span>
                    </div></a> 
                       
                    </div>`); 
                    }  
        },
        error:function(error){
            console.log(error);
        }
    });

}

$("#btn-crear-carpeta").click(function(){

    var campos= $("#GCarpeta").serialize();

    console.log("Información a guardar: " + campos);
    console.log("arreglo sesiones");
    console.log(uSession);
    if(idpadre==null){
        $.ajax({
            url:"http://localhost:3334/carpetas",
            method:"post",
            data:campos+"&usuarioCreador="+ uSession.id,
            dataType:"json",
            success: function(res){
                console.log(res);
                alertaexito();
                console.log("se creo la nueva carpeta")
                
                $("#carpeta").append(
                    `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="carpeta" id="${res._id}">
                <a href="#" ondblclick="abrircarpeta(event, '${res._id}')" class="c"><div class="carpet3">
                    <i class="fas fa-folder fol2"></i>
                   <span class="row justify-content-center etiqueta2 px-auto">${res.nombre}</span>
               </div></a> 
             </div>
             
                `)
            },
            error:function(error){
                console.log(error);
            }
        });
    }
    if(idpadre!=null){
        $.ajax({
            url:"http://localhost:3334/carpetas/carhija",
            method:"post",
            data:campos + "&carpetaPadre="+idpadre+ "&usuarioCreador="+ uSession.id,
            dataType:"json",
            success: function(res){
                console.log(res);
               alertaexito();
                console.log("se creo la nueva carpeta")
                
                $("#contenido").append(
                    `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="carpeta" id="${res._id}">
                    <a href="#" ondblclick="abrircarpeta(event, '${res._id}')" class="c"><div class="carpet3">
                    <i class="fas fa-folder fol2"></i>
                   <span class="row justify-content-center etiqueta2 px-auto">${res.nombre}</span>
               </div></a>     
             </div>
                `)
            },
            error:function(error){
                console.log(error);
            }
        });
    }
  
});

// ---------------------------------FUNCIONES ARCHIVOS-------------------------------
function obtenerArchivos(){
    $.ajax({
        url:"http://localhost:3334/archivos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            var tipo="";
            var imag="";
            for(var i=0; i<res.length;i++){
            if(res[i].usuarioCreador==uSession.id){

            if(res[i].carpetaPadre==null){
                if (res[i].extencion=="1") {
                    tipo=arrex[0];
                    imag=arrima[0];
                    res[i].nombre=res[i].nombre+tipo
                } 
                if(res[i].extencion=="2"){
                    tipo=arrex[1];
                    imag=arrima[1];
                    res[i].nombre=res[i].nombre+tipo
                }
                if(res[i].extencion=="3"){
                    tipo=arrex[2];
                    imag=arrima[2];
                    res[i].nombre=res[i].nombre+tipo
            }
       
                        idpadre=res[i].carpetaPadre;
                        $("#archivos").append(
                    `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3 pr-4" name="archivo"  id="${res[i]._id}">
                        <a href="#" ondblclick="javascript:pasarVariables('editor.html', '${res[i]._id}')" class="c"><div class="carpet3">
                        <img src=${imag}  height="65" alt="">
                        <span class="row justify-content-center etiqueta2 px-auto" id="${res[i]._id}">${res[i].nombre}</span>
                    </div></a>       
                    </div>`);
                        }
                    }
                }
         
        },
        error:function(error){
            console.log(error);
        }
    });

}

function obtenerArchivoshijos(idc){
    $.ajax({
        url:"http://localhost:3334/archivos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            var tipo="";
            var imag="";
            for(var i=0; i<res.length;i++){
                if(res[i].carpetaPadre==idc){
                        if (res[i].extencion=="1") {
                            tipo=arrex[0];
                            imag=arrima[0];
                            res[i].nombre=res[i].nombre+tipo
                        } 
                        if(res[i].extencion=="2"){
                            tipo=arrex[1];
                            imag=arrima[1];
                            res[i].nombre=res[i].nombre+tipo
                        }
                        if(res[i].extencion=="3"){
                            tipo=arrex[2];
                            imag=arrima[2];
                            res[i].nombre=res[i].nombre+tipo
                    }
               
               
                $("#contenido").append(
               `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3 pr-4" name="archivo" id="${res[i]._id}">
                <a href="#" ondblclick="javascript:pasarVariables('editor.html', '${res[i]._id}')" class="c"><div class="carpet3">
                   <img src=${imag}  height="65" alt="">
                   <span class="row justify-content-center etiqueta2 px-auto">${res[i].nombre}</span>
               </div></a>       
             </div>`);
                }       
            }
        },
        error:function(error){
            console.log(error);
        }
    });
}
function obtenerArchivoshijosC(idc){
    $.ajax({
        url:"http://localhost:3334/archivos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            var tipo="";
            var imag="";
            for(var i=0; i<res.length;i++){
                if(res[i].carpetaPadre==idc){
                        if (res[i].extencion=="1") {
                            tipo=arrex[0];
                            imag=arrima[0];
                            res[i].nombre=res[i].nombre+tipo
                        } 
                        if(res[i].extencion=="2"){
                            tipo=arrex[1];
                            imag=arrima[1];
                            res[i].nombre=res[i].nombre+tipo
                        }
                        if(res[i].extencion=="3"){
                            tipo=arrex[2];
                            imag=arrima[2];
                            res[i].nombre=res[i].nombre+tipo
                    }
               
               
                $("#cont").append(
               `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3 pr-4" name="archivo" id="${res[i]._id}">
                <a href="#" ondblclick="javascript:pasarVariables('editor.html', '${res[i]._id}')" class="c"><div class="carpet3">
                   <img src=${imag}  height="65" alt="">
                   <span class="row justify-content-center etiqueta2 px-auto">${res[i].nombre}</span>
               </div></a>       
             </div>`);
                }       
            }
        },
        error:function(error){
            console.log(error);
        }
    });
}

function obtenerArchivosCompartidos(){
    $.ajax({
        url:`http://localhost:3334/usuarios/${uSession.id}/archivos`,
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            var tipo="";
            var imag="";
            for (var i = 0; i < res[0].archivoscomp.length; i++) {
                console.log("id archivocompartida")
                console.log(res[0].archivoscomp[i]._id);
            
                    if (res[0].archivoscomp[i].extencion=="1") {
                        tipo=arrex[0];
                        imag=arrima[0];
                        res[0].archivoscomp[i].nombre=res[0].archivoscomp[i].nombre+tipo
                    } 
                    if(res[0].archivoscomp[i].extencion=="2"){
                        tipo=arrex[1];
                        imag=arrima[1];
                        res[0].archivoscomp[i].nombre=res[0].archivoscomp[i].nombre+tipo
                    }
                    if(res[0].archivoscomp[i].extencion=="3"){
                        tipo=arrex[2];
                        imag=arrima[2];
                        res[0].archivoscomp[i].nombre=res[0].archivoscomp[i].nombre+tipo
                }
                            $("#cont").append(
                        `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="archivo" id="${res[0].archivoscomp[i]._id}">
                            <a href="#" ondblclick="javascript:pasarVariables('editor.html', '${res[0].archivoscomp[i]._id}')" class="c"><div class="carpet3">
                            <img src="${imag}"  height="65" alt="">
                            <span class="row justify-content-center  etiqueta2 px-auto">${res[0].archivoscomp[i].nombre}</span>
                        </div></a>       
                        </div>`);
                            }
        
                    
                
                    
        },
        error:function(error){
            console.log(error);
        }
    });

}


$("#btn-crear-archivo").click(function(){

    var campos= $("#Garchivo").serialize();
    console.log("Información a guardar: " + campos);
    if(idpadre==null){
            $.ajax({
                url:"http://localhost:3334/archivos",
                method:"post",
                data:campos+"&usuarioCreador="+ uSession.id+"&contenidoArchivo=",
                dataType:"json",
                success: function(res){
                    console.log(res);
                    alertaexito();
                    console.log("se creo la nueva archivo")
                    var tipo="";
                    var imag="";
                    
                    if (res.extencion=="1") {
                        tipo=arrex[0];
                        imag=arrima[0];
                        res.nombre=res.nombre+tipo
                    } 
                    if(res.extencion=="2"){
                        tipo=arrex[1];
                        imag=arrima[1];
                        res.nombre=res.nombre+tipo
                    }
                    if(res.extencion=="3"){
                        tipo=arrex[2];
                        imag=arrima[2];
                        res.nombre=res.nombre+tipo
                }
                    $("#archivos").append(
                        `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="archivo"  id="${res._id}">
                        <a href="#"  ondblclick="javascript:pasarVariables('editor.html', '${res._id}')"class="c"><div class="carpet3">
                            <img src=${imag} height="65" alt="">
                            <span class="row justify-content-center etiqueta2 px-auto">${res.nombre}</span>
                        </div></a>    
                        </div>`);
                },
                error:function(error){
                    console.log(error);
                }
            });
} if(idpadre!=null){
    $.ajax({
        url:"http://localhost:3334/archivos/archivoin",
        method:"post",
        data:campos + "&carpetaPadre="+idpadre+"&usuarioCreador="+ uSession.id,
        dataType:"json",
        success: function(res){
            console.log(res);
            alertaexito();
            console.log("se creo archivo que no es null")
            var tipo="";
            var imag="";
            
            if (res.extencion=="1") {
                 tipo=arrex[0];
                 imag=arrima[0];
                 res.nombre=res.nombre+tipo
            } 
            if(res.extencion=="2"){
                tipo=arrex[1];
                imag=arrima[1];
                res.nombre=res.nombre+tipo
            }
            if(res.extencion=="3"){
                tipo=arrex[2];
                imag=arrima[2];
                res.nombre=res.nombre+tipo
           }
            $("#contenido").append(
                `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="archivo" id="${res._id}">
                <a href="#"  ondblclick="javascript:pasarVariables('editor.html', '${res._id}')" class="c"><div class="carpet3">
                    <img src=${imag} height="65" alt="">
                    <span class="row justify-content-center etiqueta2 px-auto">${res.nombre}</span>
                </div></a> 
                
                    
                </div>`);
        },
        error:function(error){
            console.log(error);
        }
    });
}
});
// -------------------------FUNCIONES PROYECTOS---------------------------------------
function obtenerProyectos(){
    $.ajax({
        url:"http://localhost:3334/proyectos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            var tipo="";
            var imag="";
            for(var i=0; i<res.length;i++){
            if(res[i].usuarioCreador==uSession.id){
                        $("#proj").append(
                    `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="proyecto"  id="${res[i]._id}">
                        <a href="#" class="c" ondblclick="javascript:pasarVariables('editor.html', '${res[i]._id}')"><div class="carpet3">
                        <img src="./img/proyectoicon.png" height="65" alt="">
                        <span class="row justify-content-center etiqueta2 px-auto">${res[i].nombre}</span>
                    </div></a>       
                    </div>`);
                        
                    }
                }
         
        },
        error:function(error){
            console.log(error);
        }
    });

}
function obtenerProyectosCompartidos(){
    $.ajax({
        url:`http://localhost:3334/usuarios/${uSession.id}/proyectos`,
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            for (var i = 0; i < res[0].proyectoscomp.length; i++) {
            $("#cont").append(
                `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="proyecto"  id="${res[0].proyectoscomp[i]._id}">
                    <a href="#" class="c" ondblclick="javascript:pasarVariables('editor.html', '${res[0].proyectoscomp[i]._id}')"><div class="carpet3">
                    <img src="./img/proyectoicon.png" height="65" alt="">
                    <span class="row justify-content-center etiqueta2 px-auto">${res[0].proyectoscomp[i].nombre}</span>
                </div></a>       
                </div>`);       
                    
        }
    },
        error:function(error){
            console.log(error);
        }
    });

}

function contar(){ 
    $.ajax({
        url:"http://localhost:3334/proyectos/"+uSession.id+"/buscar",
        method:"GET",
        dataType:"json",
        success:function(res){
            conteo2=res.length+1;
             cuenta(conteo2);
             
             console.log("conteo 2 es"+conteo2)
            
          console.log("proyectos")
          console.log(conteo2)
        },
        error:function(error){
            console.log(error);
        }
    });
}

function cuenta(conteoin){
  
    var nombreplan;
    if(uSession.tipoUsuario==1){
        console.log("usuatiotipo1 conteo aqui es:"+conteoin);
        nombreplan="Gratis";
        limiteProyecto=1
    }
    if(uSession.tipoUsuario==2){
        nombreplan="Basico";
        limiteProyecto=5
    }
    if(uSession.tipoUsuario==3){
        nombreplan="Pro";
        limiteProyecto=10
    }
    console.log("limiteProyecto es:"+limiteProyecto)
    if(conteoin<=limiteProyecto){
    var campos= $("#GProyecto").serialize();
    console.log("Información a guardar: " + campos);
    $.ajax({
        url:"http://localhost:3334/proyectos",
        method:"post",
        data:campos +"&usuarioCreador="+ uSession.id+"&aHtml="+"&aCss="+"&aJs=",
        dataType:"json",
        success: function(res){
            // conteo=conteo+1;
           alertaexito();
            console.log(res);
            console.log("se creo nuevo proyecto")
           
            $("#proj").append(
                `<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 context-menu-one carpet3" name="proyecto" id="${res._id}">
                <a href="#" ondblclick="javascript:pasarVariables('editor.html', '${res._id}')" class="c"><div class="carpet3">
                    <img src="./img/proyectoicon.png" height="65" alt="">
                    <span class="row justify-content-center etiqueta2 px-auto">${res.nombre}</span>
                </div></a> 
                 </div>`);
        },
        error:function(error){
            console.log(error);
        }
    });
}else{
     
        Swal.fire({
            type: 'warning',
            title: 'Actualiza tu Suscripcion',
            text: `Actualmente cuentas con el plan ${nombreplan}. Adquiere un nuevo plan para adquirir mas servicios`,
           
        })
    console.log("no se puede")
}
}

// ------------------------FUNCIONES DE ELIMINACION-----------------------------------
function eliminarItem(){
 
    if(nameItem=="archivo"){

        $.ajax({
            url:"http://localhost:3334/archivos/"+ idItemslc,
            method:"delete",
            dataType:"json",
            success:function(res){
                console.log("se elimino el archivo");
                
                $("#"+idItemslc).remove();
                alertaborrado();
               
            },
            error:function(error){
                console.log(error);
                }
            });
    }
    if(nameItem=="proyecto"){
        $.ajax({
            url:"http://localhost:3334/proyectos/"+ idItemslc,
            method:"delete",
            dataType:"json",
            success:function(res){
                console.log("se elimino el archivo");
                $("#"+idItemslc).remove();
                alertaborrado();
            },
            error:function(error){
                console.log(error);
                }
            });
    }
    if(nameItem=="carpeta"){
        carpetasel();
        archivodentro();
    }
}
function actualizarItem(){
    var campos= $("#gRename").serialize();
    
    if(nameItem=="archivo"){  
        $.ajax({
            url:"http://localhost:3334/archivos/"+ idItemslc+"/rename",
            method:"put",
            data:campos,
            dataType:"json",
            success:function(res){
                console.log(res)
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Actualizado con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  cargarmiunidad();
            //   $("span #"+idItemslc).text($("#nombreit").val());
            //   console.log($("span" +"#"+idItemslc).val());
            },
            error:function(error){
                console.log(error);
                }
            });
    }
    if(nameItem=="proyecto"){
        $.ajax({
            url:"http://localhost:3334/proyectos/"+ idItemslc+"/rename",
            method:"put",
            data:campos,
            dataType:"json",
            success:function(res){
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Actualizado con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  cargarmiunidad();
            },
            error:function(error){
                console.log(error);
                }
            });
    }
    if(nameItem=="carpeta"){
        $.ajax({
            url:"http://localhost:3334/carpetas/"+ idItemslc+"/rename",
            method:"put",
            data:campos,
            dataType:"json",
            success:function(res){
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Actualizado con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  cargarmiunidad();
            },
            error:function(error){
                console.log(error);
                }
            });
    }
}
function carpetasel(){
    var arreglo=[];
    $.ajax({
        url:"http://localhost:3334/carpetas",
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res)
            console.log(idItemslc);
            
               eliminarCarpetas(res);
               eliminaraiz();
            //    console.log(`carpeta padre es:`+res[i].carpetaPadre)
            //        console.log("los ids")
            //        console.log(res[i]._id);
 
            console.log(arreglo);
        },
        error:function(error){
            console.log(error);
        }
})
}
function archivodentro(){
    var arreglo=[];
    $.ajax({
        url:"http://localhost:3334/archivos",
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res)
            console.log(idItemslc);
            
               eliminarArchivos(res);
            //    eliminaraiz();
            //    console.log(`carpeta padre es:`+res[i].carpetaPadre)
            //        console.log("los ids")
            //        console.log(res[i]._id);
 
            console.log(arreglo);
        },
        error:function(error){
            console.log(error);
        }
})
}

function eliminaraiz(){
    $.ajax({
        url:"http://localhost:3334/carpetas/"+ idItemslc,
        method:"delete",
        dataType:"json",
        success:function(res){
            console.log("se elimino la carpeta orign");
            $("#"+idItemslc).remove();
            alertaborrado();
        },
        error:function(error){
            console.log(error);
            }
        });
}

function eliminarArchivos(resi){
    for (let i = 0; i < resi.length; i++) {
        if(resi[i].carpetaPadre==idItemslc){
            $.ajax({
                url:"http://localhost:3334/archivos/"+ resi[i]._id,
                method:"delete",
                dataType:"json",
                success:function(res){
                    console.log("se elimino el archivo hijo");
                    $("#"+resi[i]._id).remove();
                },
                error:function(error){
                    console.log(error);
                    }
                });
    }
}
}
function eliminarCarpetas(resi){
    // var resio=[];
    for (let i = 0; i < resi.length; i++) {
        console.log(resi[i].carpetaPadre);
        if(resi[i].carpetaPadre==idItemslc){
        //   resio.push(resi[i]._id)
            $.ajax({
            url:"http://localhost:3334/carpetas/"+ resi[i]._id,
            method:"delete",
            dataType:"json",
            success:function(res){
                console.log("se elimino la carpeta hija");
                $("#"+resi[i]._id).remove();
            },
            error:function(error){
                console.log("no se pudo eliminr por que es un archivo")
                console.log(error);
                }
            });   
      }
    //   if(resi[i].carpetaPadre==resi[i]._id){
    //       resio.push(resi[i]._id)
    //       $.ajax({
    //       url:"http://localhost:3334/carpetas/"+ resi[i]._id,
    //       method:"delete",
    //       dataType:"json",
    //       success:function(res){
    //           console.log("se elimino la carpeta hija");
    //           $("#"+resi[i]._id).remove();
    //       },
    //       error:function(error){
    //           console.log("no se pudo eliminr por que es un archivo")
    //           console.log(error);
    //           }
    //       });   
    // }
    //  if(resio.length!=0){
    //      console.log(`el tamaño de resio es` +resio.length)
    //      eliminarCarpetas(resio);
    //  }
     
    }
}
// function eliminarCarpetas2(resi){
//     var resio=[];
//     for (let i = 0; i < resi.length; i++) {
//         // console.log(resi[i].carpetaPadre);
//         if(resi[i].carpetaPadre==resio[i]._id){
//           resio.push(resi[i]._id)
//             $.ajax({
//             url:"http://localhost:3334/carpetas/"+ resi[i]._id,
//             method:"delete",
//             dataType:"json",
//             success:function(res){
//                 console.log("se elimino la carpeta hija");
//                 $("#"+resi[i]._id).remove();
//             },
//             error:function(error){
//                 console.log("no se pudo eliminr por que es un archivo")
//                 console.log(error);
//                 }
//             });   
//       }
// }
// }



// .----------------------FUNCIONES PERFIL---------------------

function llenarinputs(res){
    $("#nombre").text(`${res[0].nombre}`); 
    $("#nombrem").val(`${res[0].nombre}`);        
    $("#apellido").text(`${res[0].apellido}`); 
    $("#apellidom").val(`${res[0].apellido}`);
    $("#correo").text(`${res[0].email}`); 
    $("#correom").val(`${res[0].email}`);        
    // $("#password").text(`${res[0].password}`);
    $("#passwordm").val(`${res[0].password}`); 
    $("#usuarioName").text(`${res[0].usuarioName}`)
     

}

function Actualizar(){
    var campos= $("#formModal").serialize();
    $.ajax({  
        url:"http://localhost:3334/usuarios/"+ uSession.id,
        method:"put",
        data:campos,
        dataType:"json",
         success: function(res){
            console.log(res);
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Usuario Actualizado con exito',
                showConfirmButton: false,
                timer: 1500
              })
              $("#guardarp").attr("disabled",true);
            console.log("se va actualiza el usuario");
            // llenarinputs(res);

         },
         error:function(error){
            console.log(error);
         }
});
}

