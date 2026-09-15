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

router.post('/', crearIncidencia);
router.get('/', listarIncidencias);
router.get('/:id', buscarID);
router.put('/:id/:estado', cambiarEstado);
router.delete('/:id', eliminarIncidencia);
router.get('/', estadisticas);
router.get('/:id', clasificacion);