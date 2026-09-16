const express = require('express');
const incidenciaRoutes = require('./routes/incidencias.js');


const app = express();
const port = 3000;
//http://localhost:3000/

app.use(express.json());
app.use('/incidencias', incidenciaRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});