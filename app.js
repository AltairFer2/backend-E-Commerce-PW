const express = require('express');
const app = express();
const port = 3000;

// Importar las rutas
const indexRouter = require('./routes/index');

// Usar las rutas
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
