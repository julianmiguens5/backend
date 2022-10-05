const express = require("express");
const { Router } = express;
const Contenedor = require("./clases/contenedor")

const router = Router();
const Products = [];

const constructor = new Contenedor("productos.json");

// BOOLEANO ADMIN O USUARIO
const admin = 1;

router.get("/", (req, res) => {
  const products = constructor.getAll();
  res.send({ products });
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    res.send(constructor.getById(id));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", (req, res) => {
  if (admin == 0) {
    res.status(404).send("Error -1");
  }
  try {
    const { name, price, category, img, stock, description } = req.body;
    const id = constructor.save({ name, price, category, img, stock, description });
    res.send({ id });
  } catch (err) {
    res.status(404).send(err);
  }
});


router.put("/:id", (req, res) => {
  if (admin == 0) {
    res.status(404).send("Error -1");
  }
  try {
    const id = req.params.id;
    const newObj = req.body;
    res.send(constructor.updateById(parseInt(id), newObj));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

router.delete("/:id", (req, res) => {
  if (admin == 0) {
    res.status(404).send("Error -1");
  }
  try {
    const id = req.params.id;
    res.send(constructor.deleteById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err);
  }
});


module.exports = router;
