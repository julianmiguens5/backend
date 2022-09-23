const express = require('express');
const Contenedor = require("./clases/contenedor");

const {Server: HTTPServer} = require ('http');
const {Server: SocketServer} = require('socket.io');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);

app.set("view engine", "ejs");

app.use(express.static("views"));

//  socket
io.on('connection', socket => {
    console.log(`conectado: ${socket.id}`);
    socket.emit('products', Products);

    // escuchar los mensajes nuevos
    socket.on('new_msg', data => {
        console.log(data);
        Products.push(data);
        io.sockets.emit('products', Products);
    })
});

httpServer.listen(8081, () => {
    console.log("Conectado");
});

const Products = [];

const constructor = new Contenedor("productos.json");

app.get('/index', (req, res)=> {
  const productos = constructor.getAll();
  res.render("index", {layout: 'index', productos});
});

app.get("/", (req, res) => {
  const products = constructor.getAll();
  res.send({ products });
});

app.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    res.send(constructor.getById(id));
  } catch (err) {
    res.status(404).send(err);
  }
});

app.post("/index", (req, res) => {
  try {
    const { name, price, category, img, stock, description } = req.body;
    const id = constructor.save({ name, price, category, img, stock, description });
    if (id){
      res.redirect("index?id="+id);
    }
    res.send({ id });
    
  } catch (err) {
    res.status(404).send(err);
  }
});

app.put("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const newObj = req.body;
    res.send(constructor.updateById(parseInt(id), newObj));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

app.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    res.send(constructor.deleteById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err);
  }
});


module.exports = app;


