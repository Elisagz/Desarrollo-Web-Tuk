
$("#btn-guardar-usuario").click(function(){

    var campos= $("#formRegistro").serialize();
    console.log("Información a guardar: " + campos);
    $.ajax({
        url:"http://localhost:3334/usuarios/signUp",
        method:"post",
        data:campos,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo usuario")
        },
        error:function(error){
            console.log(error);
        }
    });
})