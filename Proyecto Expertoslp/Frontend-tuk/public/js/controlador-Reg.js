
$("#btn-guardar-usuario").click(function(){
    var campos = [
        {campo:'nombre',valido:false},
        {campo:'Apellido',valido:false},
        {campo:'usuario',valido:false},
        {campo:'email',valido:false},
        {campo:'password',valido:false}
    ];
    
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
    var campos2= $("#formRegistro").serialize();
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"http://localhost:3334/usuarios/signUp",
        method:"post",
        data:campos2+"&tipoUsuario=1",
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo usuario")
            // const Toast = Swal.mixin({
            //     toast: true,
            //     position: 'top-end',
            //     showConfirmButton: false,
            //     timer: 6000
            //   });
              
            //   Toast.fire({
            //     type: 'success',
            //     title: 'Signed in successfully'
            //   })
            window.location.href="/login.html"
        },
        error:function(error){
            console.log(error);
        }
    });
})

function validarCampoVacio(campo){
    if (document.getElementById(campo).value ==''){   
        return false;
    }else{
        return true;
    }
}