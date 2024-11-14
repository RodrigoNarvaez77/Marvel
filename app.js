require('dotenv').config();  // Cargar las variables de entorno
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');  // Requiere node-fetch para usar fetch en Node.js
const app = express();
const port = process.env.PORT || 3000;


// Middleware para servir archivos estáticos desde la carpeta View
app.use(express.static(path.join(__dirname, './views')));

const routesmarvel = require('./routes/routes'); 
app.use('/',routesmarvel);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});