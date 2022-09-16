const express = require("express");
const app = express();
const productsRouter = require("./products");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);

app.use("/", express.static(__dirname + "/views/layouts"));

app.listen(8080, () => {
  console.log("iniciado");
});
