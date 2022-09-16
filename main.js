const express = require('express');
const fs = require('fs');
const app = express();
const fspromise = fs.promises;

app.engine('coder', async (filePath, options, callback) => {
    try {
    // model
    const {nombre} = options;

    // view
    const template = await fspromise.readFile(filePath, 'utf-8');

    // controller
    const rendered = template.replace('{{nombre}}', nombre);

    return callback(null, rendered);
    } catch(e) {
        return callback(new Error("no encontrado"));
    }
});

// carpeta de vistas
app.set('views', './views');

// motor a utilizar
app.set('view engine', 'coder');

app.get('/saludo/:nombre', (req, res) => {
    const data = {
        nombre: req.params.nombre
    }

    res.render('plantilla', data)
});

app.listen(8080, () => {});