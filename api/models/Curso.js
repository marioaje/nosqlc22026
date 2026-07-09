const mongoose = require('mongoose');
// const { type } = require('node:os');

const cursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Curso", cursoSchema);