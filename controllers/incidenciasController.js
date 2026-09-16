const helper = require('../utils/helper.js');

const incidencias = [];

//! Crear una incidencia
const crearIncidencia = (req, res) => {
    const {empleado, area, descripcion, prioridad} = req.body;

    const validaciones = [
        {validar : !helper.verificarTipo(empleado, "string"), info : "El empleado debe ser una cadena de texto"},
        {validar : helper.cadenaVacia(empleado), info : "El empleado se encuentra vacio"},
        {validar : !helper.verificarTipo(area, "string"), info : "El area debe ser una cadena de texto"},
        {validar : helper.cadenaVacia(area), info : "El area se encuentra vacia"},
        {validar : !helper.verificarTipo(descripcion, "string"), info : "La descripcion debe ser una cadena de texto"},
        {validar : helper.cadenaVacia(descripcion), info : "La descripcion se encuentra vacia"},
        {validar : !helper.verificarTipo(prioridad, "string"), info : "La prioridad debe ser una cadena de texto"},
        {validar : helper.cadenaVacia(prioridad), info : "La prioridad esta vacia"},
        {validar : !validarPrioridad(prioridad), info : "La prioridad con coincide con los tipos que existen"}
    ]

    const error = validaciones.find(i => i.validar);

    if(error !== undefined){
        return res.status(400).json({ error : error.info });
    }

    const nuevaIncidencia = {
        id : helper.generarID(), 
        empleado : empleado, 
        area : area, 
        descripcion : descripcion, 
        prioridad : prioridad, 
        estado : "Pendiente"
    };

    incidencias.push(nuevaIncidencia);

    res.status(200).json({message : `La solicitud se guardo con el ID : ${nuevaIncidencia.id}`});
}

const validarPrioridad = (prioridad) => {
    const prioridades = {
        alta: "Alta",
        media: "Media",
        baja: "Baja",
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
        return res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    res.status(200).json(incidencias);
}

//! Buscar por ID
const buscarID = (req, res) => {

    if(helper.arregloVacio(incidencias)){
        return res.status(200).json({mensaje : "No hay datos disponibles"});
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
        return res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    const id = req.params.id;
    const {estado} = req.body;
    const objeto = incidencias.find(i => i.id === parseInt(id));

    if(objeto.estado === estado){
        return res.status(200).json({mensafe : "El estado es el mismo, debe elegir uno diferente para cambiarlo"});
    }

    if(!objeto){
        return res.status(400).json({mensaje : `Incidencia no encontrada (${id})`});
    }else if(!helper.verificarTipo(estado, "string")){
        return res.status(400).json({mensaje : `El \'estado\' no es un tipo de dato valido`});
    }else if(helper.cadenaVacia(estado)){
        return res.status(400).json({mensaje : `El \'estado\' se encuentra vacio`});
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
            return;
    }

    res.status(200).json({message : `El estado de la incidencia se cambio exitosamente (${objeto.id}, ${objeto.estado})`});
}

//! Eliminar incidencia

const eliminarIncidencia = (req, res) => {

    if(helper.arregloVacio(incidencias)){
        return res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    const id = parseInt(req.params.id);

    let index = incidencias.findIndex(item => item.id === id);

    if(index === -1){
        return res.status(400).json({message : `No existe la incidencia (${id})`});
    }

    //! Indice y cuantos elmentos debe borrar
    incidencias.splice(index, 1);

    res.status(200).json({message : `Se elimino correctamente la incidencia (${id})`});
}

//! Estadisticas de estado

const estadisticas = (req, res) => {

    if(helper.arregloVacio(incidencias)){
        return res.status(200).json({mensaje : "No hay datos disponibles"});
    }

    res.status(200).json({
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter(i => i.estado === "Pendiente").length,
        enProceso: incidencias.filter(i => i.estado === "En Proceso").length,
        resueltas: incidencias.filter(i => i.estado === "Resuelta").length,
        canceladas: incidencias.filter(i => i.estado === "Cancelada").length
    });
}

//! Clasificacion de prioridades

const clasificacion = (req, res) => {
    const {id} = req.params;

    const objeto = incidencias.find(i => i.id === parseInt(id));

    if(!objeto){
        return res.status(400).json(`Incidencia no encontrada (${id})`);
    }

    const nuevaClasificacion = {id: id, clas: " "};

    switch(objeto.prioridad){
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
            return;
    }

    res.status(200).json(nuevaClasificacion);
}

module.exports = {
    crearIncidencia,
    listarIncidencias,
    buscarID,
    cambiarEstado,
    eliminarIncidencia,
    estadisticas,
    clasificacion
}