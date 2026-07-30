import { config } from './config.js';
import { cursosModel } from './model/cursosModel.js';

const apiUrl = config.apiUrl + config.apiCurso;

$(document).ready(function () {
    consultarCurso();


    $("#formCursoCrear").submit(function (e) {
        e.preventDefault();
        crearCurso();
    });




});

function consultarCurso() {

    $.ajax({
        type: "get",
        url: apiUrl,
        dataType: "json",
        success: function (response) {
            dibujarTabla(response);
        },
        error: function (error) {
            console.error("Error al consultar los cursos:", error);
        }
    });

}



function dibujarTabla(cursosDatos) {

    let tabla = $("#tablaCursos");
    tabla.empty();


    $.each(cursosDatos, function (index, cursoElemento) {
        let fila = `
            <tr class="">
                <td scope="row">${cursoElemento._id}</td>
                <td>${cursoElemento.nombre}</td>
                <td>${cursoElemento.descripcion}</td>
                <td>${cursoElemento.estado}</td>
            </tr>
        `;

        tabla.append(fila);
    });


}

function crearCurso() {

    const nombre = $("#nombre").val();
    const descripcion = $("#descripcion").val();
    const estado = $("#estado").val();


    const objetoCursosModel = new cursosModel(nombre, descripcion, estado);
    // {
    //     "nombre": "base nosql tests nuevo",
    //   "descripcion": "datos sd",
    //   "estado": "test d"
    // }

    console.log(JSON.stringify(objetoCursosModel));

    $.ajax({
        type: "POST",
        url: apiUrl,
        dataType: "json",
        data: JSON.stringify(objetoCursosModel),
        contentType: "application/json",
        success: function (response) {
            alert("Curso creado");
            consultarCurso();
        },
        error: function (error) {
            console.error("Error al crear el curso:", error);
        }
    });



}