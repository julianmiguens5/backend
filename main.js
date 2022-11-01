import app from './src/server.js';
import { productosRouter }  from './src/server.js';

app.use("/api/products", productosRouter);

const port = 8080
const server = app.listen(port, () => {
    console.log(`Servidor iniciado en ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
