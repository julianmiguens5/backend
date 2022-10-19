//Libs
import express from 'express';
const app = express();

// DB
import DBContainer from './dbConnection/contenedor.js';
import mysqlconnection from './dbConnection/db.js';
import sqliteConfig from './dbConnection/SQLite3.js';

sqliteConfig.connection.filename = "./DB/ecommerce.sqlite"

const DBMensajes = new DBContainer(sqliteConfig, 'messages');
const DBProductos = new DBContainer(mysqlconnection, 'productos');

import { productosRouter } from './src/routes/productos.js';

//Socket server
import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

io.on("connection", async (socket) => {
  console.log("Se ha conectado un cliente");
  socket.emit('new-message', mensajes);
  socket.on('new-message', async (data) => {
    await DBMensajes.add(data);
    mensajes.push(data);
    io.sockets.emit('new-message', mensajes);
  });
  socket.emit('new-product', await DBProductos.getAll());
  socket.on('new-product', async (data) => {
    await DBProductos.add(data);
    const productos = await DBProductos.getAll();
    io.sockets.emit('new-product', productos);
  });
});

app.use("/productos", productosRouter);

httpServer.listen(8080, () => {
  console.log("Iniciado");
});
