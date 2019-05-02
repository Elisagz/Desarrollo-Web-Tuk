$("#btn-login-usuario").click(function(){

    var campos= $("#formLog").serialize();
    console.log("Información a usar o guardar: " + campos);
    $.ajax({
        url:"/login",
        method:"post",
        data:campos,
        dataType:"json",
        success: function(res){
            // aqui voy
            console.log(res);
            if(res.status==1)
            window.location.href="/dashboard.html" 
                // console.log("manda a otra padina")
               
           else{
               console.log("no hizo lo correcto")
               alert(res.mesaje);
           }     
        },
        error:function(error){
            console.log(error);
        }
    });
})