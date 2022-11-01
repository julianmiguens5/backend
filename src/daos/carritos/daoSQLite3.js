import CarritosDaoSQL from "./CarritosDaoSQL.js"
import config from '../../config.js'

class CarritosDaoSQLite3 extends CarritosDaoSQL {

    constructor() {
        super(config.SQLite3, "messages");
    }
}

export default CarritosDaoSQLite3
