// ContentType: Cuando envíe datos al servidor, use este tipo de contenido. El valor predeterminado es application/x-www-form-urlencoded; charset=UTF-8, lo cual está bien para la mayoría de los casos.
// DataType: El tipo de datos que espera del servidor. Si no se especifica ninguno, jQuery intentará inferirlo en función del tipo MIME de la respuesta. Puede ser text, xml, html, script, json, jsonp.

function traerInformacion(){
    $.ajax(
              {
                url:"https://g2d2c9e3dc8e22a-dbciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    // Version 0 Inspeccionar en consola del explorador
                    //console.log(respuesta);

                    // Version 1
                    // $("#resultado").empty();
                    // for (i=0; i < respuesta.items.length; i++){
                    //     $("#resultado").append(respuesta.items[i].id + respuesta.items[i].name + " " + respuesta.items[i].email + " " + respuesta.items[i].age);
                    // }           

                    // Version 2
                    // $("#resultado").empty();
                    // $("#resultado").append("<table>");
                    // $("#resultado").append("<caption>Clientes </caption>");
                    // $("#resultado").append("<tr><th>Codigo</th><th>Nombre</th> <th> Correo</th><th>Edad</th></tr>");
                    // for (i=0; i < respuesta.items.length; i++){
                    //     $("#resultado").append("<tr>");
                    //     $("#resultado").append("<td>" + respuesta.items[i].id + "</td>");
                    //     $("#resultado").append("<td>" + respuesta.items[i].name + "</td>");
                    //     $("#resultado").append("<td>" + respuesta.items[i].email + "</td>");
                    //     $("#resultado").append("<td>" + respuesta.items[i].age + "</td>");
                    //     $("#resultado").append("</tr>");
                    // }
                    // $("#resultado").append("</table>");

                    // Version 3
                    pintarRespuesta(respuesta.items);
                    
                }
                    
              }
               
          );
}


function pintarRespuesta(items){

     $("#resultado").empty();

    //declarar variables js
    let myTable="<table>";
    myTable += "<tr><th>Codigo</th><th>Nombre</th> <th> Correo</th><th>Edad</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>";                
        myTable+="<td><button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable +="</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion(){

    $("#resultado").empty();

    let myData ={name:$("#name").val(),email:$("#email").val(),age:$("#age").val()}
    let dataToSend = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'https://g2d2c9e3dc8e22a-dbciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            //console.log(respuesta);
                            alert("Inserción exitosa");
                            },
            error       :   function(xhr,status){
                                alert('Operacion no satisfactoria,'+ xhr.status );
                            }

        }
    );
}


function editarInformacion() {
    
    let myData ={id:$("#id").val(), name:$("#name").val(),email:$("#email").val(),age:$("#age").val()}
    let dataToSend = JSON.stringify(myData);
    
    $.ajax (
                {

                    url          : 'https://g2d2c9e3dc8e22a-dbciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
                    type         : 'PUT',
                    data         :  dataToSend,
                    datatype     :  "JSON",
                    contentType  : 'application/json',                    
                    success      :  function(respuesta){
                                        //console.log(respuesta);
                                        alert("Actualizacion exitosa");
                                    },
                    error       :   function(xhr,status){
                                        alert('Operacion no satisfactoria,'+ xhr.status );
                                    }

                }
            );

}

function borrarElemento(idElemento){

    
    let myData ={id:idElemento}
    let dataToSend   = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'https://g2d2c9e3dc8e22a-dbciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
            type         : 'DELETE',
            data         :  dataToSend,
            contentType  : 'application/json',
            datatype     :  "JSON",
            success      :  function(respuesta){
                                // console.log(respuesta);
                                alert("Borrado exitoso");
                            },
            error       :   function(xhr,status){                                
                                alert('Operacion no satisfactoria,'+ xhr.status );
                            }
        }
    );


}


function consultarId() {

    let codigo = $("#id").val();

    $.ajax (
                {

                    url          : 'https://g2d2c9e3dc8e22a-dbciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client/' + codigo ,
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(respuesta){
                                       pintarRespuesta(respuesta.items);
                                    },
                    error       :   function(xhr,status){
                                        alert('Operacion no satisfactoria,'+ xhr.status );
                                    },



                }
            );



}

