const express = require('express')

// referencia o eq. createServer
const app = express();

// INDICAMOS RUTA DEL ARCHIVO
let archivo = "data/products.json";
// apuntar rutas
app.get('/products',  (req, res) => {

// APLICAMOS LOS METODOS SOLICITADOS
async function start(archivo) {
    const db = new Contenedor(archivo);
       const products = await db.getAll();
       res.send(products);
  }

start(archivo);
});

app.get('/productRandom',  (req, res) => {

// APLICAMOS LOS METODOS SOLICITADOS
async function start(archivo) {
    const db = new Contenedor(archivo);
       const random = Math.floor(Math.random() * 4)
       const product = await db.getById(random);
       res.send(product);
  }

start(archivo);
});

const server = app.listen(8080,  () => {
    console.log("Servidor de express iniciado");
})

// INICIALIZAMOS FS
const fs = require("fs");

class Contenedor {

    constructor(archivo){
        this.archivo = archivo;
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

}

