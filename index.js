//const express = require('express'); // Sintaxis CommonJS
import express from 'express'; // Sintaxis ECS6
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//Definir el puerto
const port = process.env.PORT || 4000;

//Definir vistas con PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia De Viajes';
    next();
});

//Agregar body parser para leer los datos de los formularios
app.use(express.urlencoded({extended: true}));

//Definir la carpeta pública
app.use(express.static('public'));

//Agregar rutas
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});