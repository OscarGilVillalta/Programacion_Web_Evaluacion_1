let ID = 0;

const generarID = () => {
    ID += 1;
    return ID;
};

//! Verifica que una cadena de texto este vacia
const cadenaVacia = (text) => {
    if (text === null || text === undefined || typeof text !== "string" || text.trim().length === 0) {
        return true;
    }

    return false;
};

const arregloVacio = (arr) => {
    if(Array.isArray(arr) && arr.length === 0){
        return true;
    }

    return false;
}

const verificarTipo = (dato, tipoEsperado) => {
    switch (tipoEsperado.toLowerCase()) {
        case "null":
            return dato === null;
        case "array":
            return Array.isArray(dato);
        case "string":
        case "number":
        case "boolean":
        case "undefined":
        case "object":
            return typeof dato === tipoEsperado;
        default:
            return false;
    }
};

module.exports = {cadenaVacia, generarID, arregloVacio, verificarTipo};