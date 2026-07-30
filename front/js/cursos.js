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
            console.log(response);
        }
    });

}