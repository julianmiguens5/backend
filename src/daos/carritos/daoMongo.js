import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super("products", { title: String, price: Number, stock: Number, description: String, thumbnail: String });
    }

}

export default CarritosDaoMongoDb
