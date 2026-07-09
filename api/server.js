require('dotenv').config();
// PORT=6000
// MONGO_URI=mongodb://localhost:27017/basenosql

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { error } = require('node:console');

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI).
    then(() => {
        console.log("Mongo conectado");
    })
    .catch((error) => {
        console.log(error);
    });

app.use('/api/curso', require('./routes/CursoRoutes'));


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Servidor API: http://localhost:" + PORT + "/api/curso");
});