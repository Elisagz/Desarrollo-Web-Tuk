var id="5cb4aef4bb541517fcd85fd5";

var arrex=[".html",".js",".css"];
var arrima=["../img/html6.png","../img/js.png","../img/css.png"]; 





$(document).ready(function(){
    // --------------click al perfil
   $("#perfilUs").click(function(){
      $.ajax({  
         url: 'perfil.html',  
         success: function(data) {  
             document.getElementById('contenedort').innerHTML=data;
             cargardata();  
         }  
     }); 
    });

       
    //  ------------------llenar inputs perfil----------
  
   
// ----------------click a mi unidad--------------
        $("#miunidad").click(function(){
            $.ajax({  
            url: 'miunidad.html',  
            success: function(data) {  
                document.getElementById('contenedort').innerHTML=data;
                obtenerCarpetas();
                obtenerArchivos();  
            
        
        
    }
        });
    });  
        
 
 });



 function dele(){
    $("#contenedort").html("")
    console.log("cargo fuera");
    // $.ajax({  
    //     url: 'contenido.html',  
    //     success: function(data) {  
    //         document.getElementById('contenedort').innerHTML=data;
    //         console.log("cargo")
    //         // obtenerCarpetas();
    //         // obtenerArchivos(); 
//  }});
};
function cargardata(){
    $.ajax({  
        url:"http://localhost:3334/usuarios/"+ id,
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
                $("#password").text($("#passwordm").val()); 
        }
   
// -----------------funvciones para carpetas-----------------
function obtenerCarpetas(){
    $.ajax({
        url:"http://localhost:3334/carpetas",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            generarItems(res);
        },
        error:function(error){
            console.log(error);
        }
    });
}


function generarItems(res){
   
    
    for(var i=0; i<res.length;i++){
        
            $("#carpeta").append(
                `<div class="col-2 >
                <a href="#" ondblclick="dele()" class="c"><div class="carpet3">
                    <i class="fas fa-folder fol2"></i>
                <span class="col etiqueta2 px-auto">${res[i].nombre}</span>
            </div></a> 
                
                
            </div>`);
                
    }
}

$("#btn-crear-carpeta").click(function(){

    var campos= $("#GCarpeta").serialize();
    console.log("Información a guardar: " + campos);
    $.ajax({
        url:"http://localhost:3334/carpetas",
        method:"post",
        data:campos,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se creo la nueva carpeta")
            
            $("#carpeta").append(
                `<div class="col-2 >
            <a href="#" ondblclick="dele()" class="c"><div class="carpet3">
                <i class="fas fa-folder fol2"></i>
               <span class="col etiqueta2 px-auto">${res.nombre}</span>
           </div></a> 
            
               
         </div>
            `)
        },
        error:function(error){
            console.log(error);
        }
    });
});

// -----------------funciones para archivos---------------
function obtenerArchivos(){
    $.ajax({
        url:"http://localhost:3334/archivos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            generarArchivos(res);
        },
        error:function(error){
            console.log(error);
        }
    });

}

function generarArchivos(res){  
    var tipo="";
    var imag="";
    for(var i=0; i<res.length;i++){
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
        $("#archivos").append(
       `<div class="col-2 ">
        <a href="" class="c"><div class="carpet3">
           <img src=${imag}  height="65" alt="">
           <span class="col etiqueta2 px-auto">${res[i].nombre}</span>
       </div></a>       
     </div>`);
                
    }
};

$("#btn-crear-archivo").click(function(){

    var campos= $("#Garchivo").serialize();
    console.log("Información a guardar: " + campos);
    $.ajax({
        url:"http://localhost:3334/archivos",
        method:"post",
        data:campos,
        dataType:"json",
        success: function(res){
            console.log(res);
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
                `<div class="col-2 id="dele">
      <a href="" class="c"><div class="carpet3">
           <img src=${imag} height="65" alt="">
           <span class="col etiqueta2 px-auto">${res.nombre}</span>
       </div></a> 
       
          
     </div>`);
        },
        error:function(error){
            console.log(error);
        }
    });
})

// .----------------------funciones Perfil---------------------

function llenarinputs(res){
    $("#nombre").text(`${res[0].nombre}`); 
    $("#nombrem").val(`${res[0].nombre}`);        
    $("#apellido").text(`${res[0].apellido}`); 
    $("#apellidom").val(`${res[0].apellido}`);
    $("#correo").text(`${res[0].email}`); 
    $("#correom").val(`${res[0].email}`);        
    $("#password").text(`${res[0].password}`); 
    $("#passwordm").val(`${res[0].password}`); 
    $("#usuarioName").text(`${res[0].usuarioName}`)
     

}





function Actualizar(){
    var campos= $("#formModal").serialize();
    $.ajax({  
        url:"http://localhost:3334/usuarios/"+ id,
        method:"put",
        data:campos,
        dataType:"json",
         success: function(res){
            console.log(res);
            console.log("se va actualiza el usuario");
            // llenarinputs(res);

         },
         error:function(error){
            console.log(error);
         }
});
};
