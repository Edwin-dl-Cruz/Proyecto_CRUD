var dbRegistros = localStorage.getItem("dbRegistros");
var operacion = "A"; 
dbRegistros = JSON.parse(dbRegistros); 
if (dbRegistros === null) 
    dbRegistros = [];

function Mensaje(t) {
    switch (t) {
        case 1: //
            $(".mensaje-alerta").append(
                "<div class='alert alert-success' role='alert'>Se agrego con exito el registro</div>"
            );
            break;
        case 2: //
            $(".mensaje-alerta").append(
                "<div class='alert alert-danger' role='alert'>Se elimino el registro</div>"
            );
            break;
        default:

    }
}

function AgregarRegistro() {
    var datos_cliente = JSON.stringify({
        Nombre: $("#nombre").val(),
        Correo: $("#correo").val(),
        Edad: $("#edad").val(),
        Direccion: $("#direccion").val(),
        Curso: $("#curso").val(),
    });

    dbRegistros.push(datos_cliente); 
    localStorage.setItem("dbRegistros", JSON.stringify(dbRegistros));
    ListarRegistro();
    return Mensaje(1);
}

function ListarRegistro() {
    $("#dbRegistros-list").html(
        "<thead>" +
        "<tr>" +
        "<th> ID </th>" +
        "<th> Nombre </th>" +
        "<th> Correo </th>" +
        "<th> Edad </th>" +
        "<th> Direccion </th>" +
        "<th> Curso </th>" +
        "<th> </th>" +
        "<th>  </th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>"
    );

    for (var i in dbRegistros) {
        var d = JSON.parse(dbRegistros[i]);
        $("#dbRegistros-list").append(
            "<tr>" +
            "<td>" + i + "</td>" +
            "<td>" + d.Nombre + "</td>" +
            "<td>" + d.Correo + "</td>" +
            "<td>" + d.Edad + "</td>" +
            "<td>" + d.Direccion + "</td>" +
            "<td>" + d.Curso + "</td>" +
            "<td> <a id='" + i + "' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
            "</tr>"
        );
    }

}

if (dbRegistros.length !== 0) {
    ListarRegistro();
} else {
    $("#dbRegistros-list").append("<h2> No hay registro </h2>");
}

function contarRegistros() {
    var Registros = dbRegistros;
    nRegistros = Registros.length;

    $("#numeroRegistros").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nRegistros + "</span></a> Registros"
    );
    return nRegistros;
}

function Eliminar(e) {
    dbRegistros.splice(e, 1);
    localStorage.setItem("dbRegistros", JSON.stringify(dbRegistros));
    return Mensaje(2);
}

function Editar() {
    dbRegistros[indice_selecionado] = JSON.stringify({
        Nombre: $("#nombre").val(),
        Correo: $("#correo").val(),
        Edad: $("#edad").val(),
        Direccion: $("#direccion").val(),
        Curso: $("#curso").val(),
    });
    localStorage.setItem("dbRegistros", JSON.stringify(dbRegistros));
    operacion = "A";
    return true;
}

$(".btnEliminar").bind("click", function () {
    alert("¿ Eliminar registro ?");
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado);
    ListarRegistro();
    location.reload();
});

$(".btnEditar").bind("click", function () {
    alert("¿ Desea editar ?");
    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Ingresar Nuevos Datos");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    var RegistroItem = JSON.parse(dbRegistros[indice_selecionado]);
    $("#nombre").val(registroItem.Nombre);
    $("#correo").val(registroItem.Correo);
    $("#edad").val(registroItem.Edad);
    $("#direccion").val(registroItem.Direccion);
    $("#curso").val(registroItem.Curso);
    $("#nombre").focus();
});


contarRegistros();
$("#Registros-form").bind("submit", function () {
    debugger;
    if (operacion == "A")
        return AgregarRegistro();
    else {
        return Editar();
    }
});