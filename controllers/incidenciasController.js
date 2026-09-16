const helper = require('../utils/helper.js');

const incidencias = [];

//! Crear una incidencia
const crearIncidencia = (req, res) => {
    const {empleado, area, descripcion, prioridad} = req.body;

    const nuevoPaquete = {
        id : helper.generarID(), 
        empleado : empleado, 
        area : area, 
        descripcion : descripcion, 
        prioridad : prioridad, 
        estado : "pendiente"
    };

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

    res.status(200).json({message : `La solicitud se guardo con el ID : ${nuevoPaquete.id}`});
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

    if(helper.arregloVacio(incidencias)){
        res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    res.status(200).json(incidencias);
}

//! Buscar por ID
const buscarID = (req, res) => {

    if(helper.arregloVacio(incidencias)){
        res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    const id = parseInt(req.params.id);
    const objeto = incidencias.find(i => i.id === id);

    if(!objeto){
        return res.status(400).json(`Incidencia no encontrada (${id})`);
    }

    res.status(200).json(objeto);
}

//! Cambiar Estado

const cambiarEstado = (req, res) => {

    if(helper.arregloVacio(incidencias)){
        res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    const {id, estado} = req.params;
    const objeto = incidencias.find(i => i.id === parseInt(id));

    if(!objeto){
        return res.status(400).json(`Incidencia no encontrada (${id})`);
    }

    switch(estado){
        case "Pendiente":
            objeto.estado = "Pendiente";
            break;
        case "En Proceso":
            objeto.estado = "En Proceso";
            break;
        case "Resuelta":
            objeto.estado = "Resuelta";
            break;
        case "Cancelada":
            objeto.estado = "Cancelada";
            break;
        default:
            res.status(400).json({message : "El estado no es valido"});
            break;
    }

    res.status(200).json({message : `El estado de la incidencia se cambio exitosamente (${objeto.id}, ${objeto.estado})`});
}

//! Eliminar incidencia

const eliminarIncidencia = (req, res) => {

    if(helper.arregloVacio(incidencias)){
        res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    const id = parseInt(req.params.id);

    let index = incidencias.findIndex(id);

    if(index === (-1)){
        return res.status(400).json({message : `No existe la incidencia (${id})`});
    }

    //! Indice y cuantos elmentos debe borrar
    incidencias.splice(index, 1);

    res.status(400).json({message : `Se elimino correctamente la incidencia (${id})`});
}

//! Estadisticas de estado

const estadisticas = (req, res) => {
    res.status(200).json({
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter(incidencias => incidencias.estado === "Pendiente").length,
        enProceso: incidencias.filter(incidencias => incidencias.estado === "En Proceso").length,
        resueltas: incidencias.filter(incidencias => incidencias.estado === "Resuelta").length,
        canceladas: incidencias.filter(incidencias => incidencias.estado === "Cancelada").length
    });
}

//! Clasificacion de prioridades

const clasificacion = (req, res) => {
    const {id, prioridad} = req.params;

    const objeto = incidencias.find(i => i.id === parseInt(id));

    if(!objeto){
        return res.status(400).json(`Incidencia no encontrada (${id})`);
    }

    const nuevaClasificacion = {id, clas};
    nuevaClasificacion.id = id;

    switch(prioridad){
        case "Baja":
            nuevaClasificacion.clas = "Normal";
            break;
        case "Media":
            nuevaClasificacion.clas = "Importante";
            break;
        case "Alta":
            nuevaClasificacion.clas = "Critica";
            break;
        default:
            res.status(404).json({message : "La prioridad no es valida"});
            break;
    }

    res.status(200).json(nuevaClasificacion);
}