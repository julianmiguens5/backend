// INICIALIZAMOS FS
const fs = require("fs");

class Contenedor {

    constructor(archivo){
        this.archivo = archivo;
    }


// METODO AGREGAR PRODUCTO
async save(objeto){
    const data = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    const products = JSON.parse(data);
    const id = products.length + 1;
    objeto.id = id;
    products.push(objeto);
    const productsString = JSON.stringify(products);
    await fs.promises.writeFile(
      `${this.archivo}`, productsString
    );
    return id;
}

// METODO BUSCAR PRODUCTO
async getById(id) {
    const data = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    const products = JSON.parse(data);
    const product = products.find((product) => product.id == id);
    if (product) {
      return product;
    } else {
      return "Producto no encontrado";
    }
  }

  // METODO LISTAR TODOS LOS PRODUCTOS
  async getAll() {
    try {
      const data = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // METODO BORRAR PRODUCTO
  async deleteById(id){
    const data = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    const products = JSON.parse(data);
    const product = products.find((product) => product.id == id);
    if (product) {
        const filterProd = products.filter((products) => products.id !== id);
        const productsString = JSON.stringify(filterProd);
        await fs.promises.writeFile(
            `${this.archivo}`, productsString
        );
        return `Producto ${id} eliminado`;
    } else {
        return `Producto con ID ${id} no existe`;
    }
  }

  // METODO BORRAR TODOS LOS PRODUCTOS
  async deleteAll(){
    await fs.promises.writeFile(
      `${this.archivo}`, ''
    );
    return `Todos los productos han sido eliminados`;
    }

}

// INDICAMOS RUTA DEL ARCHIVO
let archivo = "data/products.json";

// APLICAMOS LOS METODOS SOLICITADOS
async function start(archivo) {
    const db = new Contenedor(archivo);
       const addProduct = await db.save({name: "CINTA GT5",
       price: "$ 150000",
       category: "cardio",
       img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/491/999/products/natural-11-95ba26dd6fe50b475c16092699982897-640-0.jpg",
       stock: 10,
       description: "Cinta para correr"});
       console.log(addProduct);
       const products = await db.getAll();
       console.log(products);
       const product = await db.getById(2);
       console.log(product);
       const deleteProduct = await db.deleteById(8);
       console.log(deleteProduct);
       const deleteAllProd = await db.deleteAll();
       console.log(deleteAllProd);
  }

start(archivo);