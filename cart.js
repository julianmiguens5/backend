const express = require("express");
const cartContainer = require("./clases/cartcontainer");
const { Router } = express;

const router = Router();
const Products = [];

const constructor = new cartContainer("carrito.json");

// BOOLEANO ADMIN O USUARIO
const admin = 1;

router.get("/:id/productos", (req, res) => {
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
    const { } = req.body;
    const id = constructor.create({ });
    res.send({ id });
  } catch (err) {
    res.status(404).send(err);
  }
});


router.post("/:id/productos", (req, res) => {
  try {
    const id = req.params.id;
    const newObj = req.body;
    res.send(constructor.addProd(parseInt(id), newObj));
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
