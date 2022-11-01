import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }

    async guardar(carrito = { productos: [] }) {
        return super.create(carrito)
    }
}

export default CarritosDaoFirebase
