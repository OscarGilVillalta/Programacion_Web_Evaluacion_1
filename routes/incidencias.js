const express = require('express');
const router = express.Router();

const {
    crearIncidencia,
    listarIncidencias,
    buscarID,
    cambiarEstado,
    eliminarIncidencia,
    estadisticas,
    clasificacion
} = require ('../controllers/incidenciasController.js')

router.post('/incidencias', crearIncidencia);
router.get('/incidencias', listarIncidencias);
router.get('/incidencias/:id', buscarID);
router.put('/incidencias/:id/:estado', cambiarEstado);
router.delete('/incidencias/:id', eliminarIncidencia);
router.get('/estadisticas', estadisticas);
router.get('/incidencias/:id/clasificacion', clasificacion);