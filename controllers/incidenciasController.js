const helper = require('../utils/helper.js');

const incidencias = [];

//! Crear una incidencia
const crearIncidencia = (req, res) => {
    const {empleado, area, descripcion, prioridad} = req.body;

    const nuevoPaquete = {id, empleado, area, descripcion, prioridad, estado};
    nuevoPaquete.id = helper.generarID();
    nuevoPaquete.estado = "pendiente";
    
    const validaciones = [
        {validar : helper.cadenaVacia(empleado), info : "El empleado se encuentra vacio"},
        {validar : helper.cadenaVacia(area), info : "El area se encuentra vacia"},
        {validar : helper.cadenaVacia(descripcion), info : "La descripcion se encuentra vacia"},
        {validar : helper.cadenaVacia(prioridad), info : "La prioridad esta vacia"} ,
        {validar : validarPrioridad(prioridad), info : "La prioridad con coincide con los tipos que existen"}
    ]

    const error = validaciones.find(i => i.validar);

    if(error !== undefined){
        return res.status(400).json({ error : error.info });
    }

    incidencias.push(nuevoPaquete);

    res.status(200).json({mensaje : `La solicitud se guardo con el ID : ${nuevoPaquete.id}`});
}

const validarPrioridad = (prioridad) => {
    const prioridades = {
        alta: "alta",
        media: "media",
        baja: "baja",
    };

    for(const valor in prioridades){
        if(prioridades[valor] === prioridad){
            return true;
        }
    }

    return false;
};

//! Retornar incidencias en formato JSON

const listarIncidencias = (req, res) => {
    res.status(200).json(incidencias);
}

//! Buscar por ID
const buscarID = (req, res) => {
    const id = parseInt(req.params.id);

    const objeto = incidencias.find(i => i.id === id);

    if(!objeto){
        return res.status(400).json(`Incidencia no encontrada (${id})`);
    }

    res.status(200).json(objeto);
}