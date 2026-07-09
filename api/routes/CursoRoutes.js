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


//PUT
router.put('/:id', async (req, res) => {

    try {

        const cursosObjeto = await Curso.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        res.status(202).json(
            {
                codigo: 202,
                data: cursosObjeto,
                mensaje: "datos actualizados"

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



//PUT
router.delete('/:id', async (req, res) => {

    try {

        await Curso.findByIdAndDelete(
            req.params.id
        );


        res.status(202).json(
            {
                codigo: 202,
                data: req.params.id,
                mensaje: "datos eliminados"

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