import { config } from './config.js';
import { cursosModel } from './model/cursosModel.js';

const apiUrl = config.apiUrl + config.apiCurso;

$(document).ready(function () {
    consultarCurso();


    $("#formCursoCrear").submit(function (e) {
        e.preventDefault();
        crearCurso();
    });


    $("#formCursoEditar").submit(function (e) {
        e.preventDefault();
        editarCurso();
    });

    $("#formCursoEliminar").submit(function (e) {
        e.preventDefault();

        eliminarCurso();
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
                <td>
                  <a
                    name=""
                    id=""
                    class="btn btn-success"
                    href="#"
                    role="button"
                    onclick="cargarActualizar( '${cursoElemento._id}', '${cursoElemento.nombre}', '${cursoElemento.descripcion}', '${cursoElemento.estado}')"
                    >Actualizar</a>    
                    <a
                    name=""
                    id=""
                    class="btn btn-danger"
                    href="#"
                    role="button"
                    onclick="cargarEliminar( '${cursoElemento._id}', '${cursoElemento.nombre}', '${cursoElemento.descripcion}', '${cursoElemento.estado}')"
                    >Eliminar</a>                  
                </td>
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

    // console.log(JSON.stringify(objetoCursosModel));

    $.ajax({
        type: "POST",
        url: apiUrl,
        dataType: "json",
        data: JSON.stringify(objetoCursosModel),
        contentType: "application/json",
        success: function (response) {
            finalizarCurso();
        },
        error: function (error) {
            console.error("Error al crear el curso:", error);
        }
    });



}

function finalizarCurso() {
    alert("Curso creado");
    consultarCurso();

    $("#formCursoCrear")[0].reset();

    bootstrap.Modal.getInstance($("#modalId")[0]).hide();

}


window.cargarActualizar = function (_id, nombre, descripcion, estado) {
    $("#idEditar").val(_id);
    $("#nombreEditar").val(nombre);
    $("#descripcionEditar").val(descripcion);
    $("#estadoEditar").val(estado);


    const modalEditar = new bootstrap.Modal($("#modalEditar")[0]);
    modalEditar.show();

}


function editarCurso() {

    const idEditar = $("#idEditar").val();
    const nombre = $("#nombreEditar").val();
    const descripcion = $("#descripcionEditar").val();
    const estado = $("#estadoEditar").val();


    const objetoCursosModel = new cursosModel(nombre, descripcion, estado);


    $.ajax({
        type: "PUT",
        url: `${apiUrl}/${idEditar}`,
        dataType: "json",
        data: JSON.stringify(objetoCursosModel),
        contentType: "application/json",
        success: function (response) {
            finalizarCursoEditar();
        },
        error: function (error) {
            console.error("Error al editar el curso:", error);
        }
    });


}



function finalizarCursoEditar() {
    alert("Curso editado");
    consultarCurso();

    $("#formCursoEditar")[0].reset();

    bootstrap.Modal.getInstance($("#modalEditar")[0]).hide();

}



window.cargarEliminar = function (_id, nombre, descripcion, estado) {
    $("#idEliminar").val(_id);
    $("#nombreEliminar").val(nombre);
    $("#descripcionEliminar").val(descripcion);
    $("#estadoEliminar").val(estado);


    const modalEliminar = new bootstrap.Modal($("#modalEliminar")[0]);
    modalEliminar.show();

}


function eliminarCurso() {

    const idEliminar = $("#idEliminar").val();


    $.ajax({
        type: "DELETE",
        url: `${apiUrl}/${idEliminar}`,
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            finalizarCursoEliminar();
        },
        error: function (error) {
            console.error("Error al eliminar el curso:", error);
        }
    });

}


function finalizarCursoEliminar() {
    alert("Curso eliminado");
    consultarCurso();

    $("#formCursoEliminar")[0].reset();

    bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();

}

