const express = require("express");
const Contenedor = require("./clases/contenedor");
const app = express();
const handlebars = require("express-handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

//app.use('views', './views/');
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views/layouts/",

});

app.listen(8080, () => {
  console.log("iniciado");
});

// HANDLEBARS
/*app.engine('hbs', hbs);

app.set("view engine", "hbs");
*/

// PUG
//app.set("view engine", "pug");

// EJS
app.set("view engine", "ejs");

app.get('/index', (req, res)=> {
  // HANDLEBARS
  //res.render("layouts/index", {layout: 'index'});
  // PUG
  //res.render("layouts/index");
  // EJS
  res.render("layouts/index", {layout: 'index'});
});

app.get('/list', (req, res)=> {
  const productos = constructor.getAll();
  // HANDLEBARS
  //res.render("layouts/index", {layout: 'list', productos });
  // PUG
  //res.render("layouts/list", {layout: 'list', productos });
  // EJS
  res.render("layouts/list", {layout: 'list', productos });
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

const Products = [];

const constructor = new Contenedor("productos.json");

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

/*
app.post("/", (req, res) => {
  try {
    const { name, price, category, img, stock, description } = req.body;
    const id = constructor.save({ name, price, category, img, stock, description });
    res.send({ id });
  } catch (err) {
    res.status(404).send(err);
  }
});
*/


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
