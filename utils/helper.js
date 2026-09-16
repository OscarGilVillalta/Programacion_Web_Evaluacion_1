let ID = 0;

const generarID = () => {
    ID += 1;
    return ID;
};

//! Verifica que una cadena de texto este vacia
const cadenaVacia = (text) => {
    if (text.trim().length === 0) {
        return true;
    }

    return false;
};

module.exports(cadenaVacia, generarID);
