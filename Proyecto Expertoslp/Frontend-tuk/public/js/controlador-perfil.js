var id="5cb4aef4bb541517fcd85fd5";

$(document).ready(function(){

  
});


function Actualizar(id){
        $.ajax({  
            url:"http://localhost:3334/usuarios/"+ id,
            method:"put",
             dataType:"json",
             success: function(res){
                console.log(res);
                console.log("se va actualiza el usuario");

             },
             error:function(error){
                console.log(error);
             }
    });

}




