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
router.get('/estadisticas', estadisticas); //! Funciona
router.get('/:id', buscarID); //! Funciona
router.put('/:id/estado', cambiarEstado); //! Funciona (Verificar que cambie el tipo)
router.delete('/:id', eliminarIncidencia); //! Funciona
router.get('/:id/clasificacion', clasificacion); //! Funciona

module.exports = router;