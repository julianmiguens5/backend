const fs = require("fs");

class ContenedorArchivo {
    save(objeto){
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
    
    // METODO BUSCAR PRODUCTO
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
    
      // METODO LISTAR TODOS LOS PRODUCTOS
      getAll() {
        const data = fs.readFileSync(`${this.archivo}`, "utf-8");
        const dataParseada = JSON.parse(data);
        return dataParseada;
      }
    
        // METODO BORRAR PRODUCTO
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
                return `Producto ${id} eliminado`;
            } else {
                return `Producto con ID ${id} no existe`;
            }
          }
        
          // METODO BORRAR TODOS LOS PRODUCTOS
          deleteAll(){
            fs.writeFileSync(
              `${this.archivo}`, ''
            );
            return `Todos los productos han sido eliminados`;
            }
    
        // METODO EDITAR PRODUCTO
           updateById(id, objNew) {
            const data = fs.readFileSync(`${this.archivo}`, "utf-8");
            let parsedData = JSON.parse(data);
            let oldProd = parsedData.find((objeto) => objeto.id === id);
            let mensaje = `Producto ${id} actualizado`;
            if (oldProd === undefined) {
                return `Producto con ID ${id} no existe`;
            }
            let filteredProd = parsedData.filter((objeto) => objeto.id !== id);
            oldProd = { id, ...objNew };
            filteredProd.push(oldProd);
            fs.writeFileSync(this.archivo, JSON.stringify(filteredProd, null, 2));
            return mensaje;
        }
}


export default ContenedorArchivo