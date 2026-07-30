import { config } from './config.js';

const apiUrl = config.apiUrl + config.apiCurso;

$(document).ready(function () {
    consultarCurso();
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