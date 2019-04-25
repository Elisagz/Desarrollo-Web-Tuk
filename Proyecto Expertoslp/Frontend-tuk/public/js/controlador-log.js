// $("#btn-login-usuario").click(function(){

//     var campos= $("#formLog").serialize();
//     console.log("Información a guardar: " + campos);
//     $.ajax({
//         url:"http://localhost:3334/usuarios/signIn",
//         method:"post",
//         data:campos,
//         dataType:"json",
//         success: function(res){
//             console.log(res);
//             console.log("se entro el nuevo usuario")
//         },
//         error:function(error){
//             console.log(error);
//         }
//     });
// })