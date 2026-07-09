const express = require('express');

const router = express.Router();

const Curso = require('../models/Curso');

//GET
router.get('/', async (req, res) => {

    try {

        const cursosObjeto = await Curso.find();

        res.json(cursosObjeto);


    } catch (error) {
        res.status(500).json(
            {
                mensaje: error.message,
                mensajePersonalizado: "Se cayo el api"
            }
        )
    }

});
//GET id
router.get('/:id', async (req, res) => {

    try {

        const cursosObjeto = await Curso.findById(req.params.id);

        res.json(cursosObjeto);


    } catch (error) {
        res.status(500).json(
            {
                mensaje: error.message,
                mensajePersonalizado: "Se cayo el api"
            }
        )
    }

});


//POST
router.post('/', async (req, res) => {

    try {

        const cursosObjeto = new Curso(req.body);

        const cursoRespuesta = await cursosObjeto.save();

        res.status(201).json(
            {
                codigo: 201,
                data: cursoRespuesta,
                mensaje: "datos almacenados"

            }
        )


    } catch (error) {
        res.status(400).json(
            {
                mensaje: error.message,
                mensajePersonalizado: "Se cayo el api"

            }
        )
    }

});


module.exports = router;