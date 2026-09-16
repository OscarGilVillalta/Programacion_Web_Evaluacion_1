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
} = require ('../controllers/incidenciasController')

router.post('/', crearIncidencia); //! Funciona
router.get('/', listarIncidencias); //! Funciona
router.get('/:id', buscarID); //! Funciona
router.put('/:id/:estado', cambiarEstado); //! Funciona (Verificar que cambie el tipo)
router.delete('/:id', eliminarIncidencia); //! Error
router.get('/estadisticas', estadisticas); //! Error
router.get('/:id/clasificacion', clasificacion); //! Error

module.exports = router;