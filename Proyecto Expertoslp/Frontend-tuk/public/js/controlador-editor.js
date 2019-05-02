var codProyecto = window.location.search.substring(1);
var aHtml;
var aCss;
var aJs;


var contenido;

$(document).ready(function(){
    cargarProyecto();
});

function update(){
                var res=document.getElementById('resultado').contentWindow.document;
                
                res.open();
                res.writeln(edHtml.getValue() +
                            '<style>' + edCss.getValue() + '</style>'+
                             '<script>'+ edJs.getValue()+'<\/script>');

                res.close();
            }
  function setEditor(){
                window.edHtml= ace.edit('htmle');
                edHtml.setTheme("ace/theme/cobalt");
                edHtml.session.setMode("ace/mode/html");
                // edHtml.setValue();

               window.edCss= ace.edit("ecss");
                edCss.setTheme("ace/theme/cobalt");
                edCss.session.setMode("ace/mode/css");
                console.log(edCss)
               
               window.edJs= ace.edit("ejs");
                edJs.setTheme("ace/theme/cobalt");
                edJs.session.setMode("ace/mode/javascript");
               
                edHtml.getSession().on('change', function(){
                    update();
                    contenido=edHtml.getValue();
                    // console.log(contenido)
                })

                edCss.getSession().on('change', function(){
                    update();
                })

                edJs.getSession().on('change', function(){
                    update();
                    
                })

            }

  console.log(codProyecto);
 setEditor();
 update();

 $("#guardarproj").click(function(){
    console.log();
    aHtml=edHtml.getValue();
    aCss=edCss.getValue();
    aJs=edJs.getValue();

    campos={aHtml, aCss, aJs};
    $.ajax({  
        url:"http://localhost:3334/proyectos/"+ codProyecto,
        method:"put",
        data:campos,
        dataType:"json",
         success: function(res){
            console.log(res);
            console.log("se va actualiza el usuario");
        //    edHtml.setValue(aHtml)

            // console.log(contenidohtml)
            // llenarinputs(res);

         },
         error:function(error){
            console.log(error);
         }

 })
});

function cargarProyecto(){
    // campos={aHtml, aCss, aJs};
    $.ajax({  
        url:"http://localhost:3334/proyectos/"+ codProyecto,
        method:"get",
        dataType:"json",
         success: function(res){
            console.log(res[0].aHtml);
            edHtml.setValue(res[0].aHtml);
            edCss.setValue(res[0].aCss);
            edJs.setValue(res[0].aJs)
         },
         error:function(error){
            console.log(error);
         }
        })
}