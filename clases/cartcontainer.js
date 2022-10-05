const fs = require("fs");

class cartContainer {

    constructor(archivo){
        this.archivo = archivo;
    }

// METODO CREAR CARRITO
create(objeto){
    const data = fs.readFileSync(`${this.archivo}`, "utf-8");
    const products = JSON.parse(data);
    const id = products.length + 1;
    objeto.id = id;
    products.push(objeto);
    const productsString = JSON.stringify(products);
    fs.writeFileSync(
      `${this.archivo}`, productsString
    );
    return id;
}

// METODO BUSCAR CARRITO
getById(id) {
    const data = fs.readFileSync(`${this.archivo}`, "utf-8");
    const products = JSON.parse(data);
    const product = products.find((product) => product.id == id);
    if (product) {
      return product;
    } else {
      return "Producto no encontrado";
    }
  }

    // METODO BORRAR CARRITO
    deleteById(id){
        const data = fs.readFileSync(`${this.archivo}`, "utf-8");
        const products = JSON.parse(data);
        const product = products.find((product) => product.id === id);
        if (product) {
            const filterProd = products.filter((products) => products.id !== id);
            const productsString = JSON.stringify(filterProd);
            fs.writeFileSync(
                `${this.archivo}`, productsString
            );
            return `Carrito ${id} eliminado`;
        } else {
            return `Carrito con ID ${id} no existe`;
        }
      }
    
      // METODO BORRAR TODOS LOS CARRITOS
      deleteAll(){
        fs.writeFileSync(
          `${this.archivo}`, ''
        );
        return `Todos los Carritos han sido eliminados`;
        }

    // AGREGAR PRODUCTO AL CARRITO
       addProd(id, objNew) {
        const data = fs.readFileSync(`${this.archivo}`, "utf-8");
        let parsedData = JSON.parse(data);
        let carrito = parsedData.find((objeto) => objeto.id === id);
        let mensaje = `Carrito ${id} actualizado`;
        if (carrito === undefined) {
            return `Carrito con ID ${id} no existe`;
        }
        /*let filteredProd = parsedData.filter((objeto) => objeto.id !== id);*/
        carrito.products.push(objNew);
        /*parsedData.push(carrito);*/
        fs.writeFileSync(this.archivo, JSON.stringify(parsedData, null, 2));
        return parsedData;
    }

}

module.exports = cartContainer;