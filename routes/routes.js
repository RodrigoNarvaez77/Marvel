
const express = require('express');
const app = express.Router();
require('dotenv').config();  // Cargar las variables de entorno
const fetch = require('node-fetch');  // Requiere node-fetch para usar fetch en Node.js
const CryptoJS = require('crypto-js');  // Librería para MD5 y otros algoritmos criptográficos

// Reemplaza con tus claves de API
const publicKey = process.env.APIKEYPUBLIC;
const privateKey = process.env.APIKEYPRIVATE;

// Ruta de la API de Marvel
  app.get('/marvel-data', async (req, res) => {
    try {
      // Genera el timestamp (ts) actual
      const ts = new Date().getTime();
  
      // Genera el hash MD5 utilizando el timestamp, la clave privada y la clave pública
      const hash = generateHash(ts, privateKey, publicKey);
  
      // Construye la URL con los parámetros necesarios
      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;  
      //console.log(`Realizando solicitud a: ${url}`);  // Imprime la URL para depuración
  
      // Realiza la solicitud HTTP utilizando fetch y espera la respuesta
      const response = await fetch(url);
  
      // Si la respuesta no es exitosa, lanza un error
      if (!response.ok) {
        // Obtén el cuerpo de la respuesta de error para más detalles
        const errorDetails = await response.text();
        throw new Error(`Error en la solicitud a la API. Código de estado: ${response.status}. Detalles: ${errorDetails}`);
      }
  
      // Convierte la respuesta a formato JSON
      const data = await response.json();
  
      // Devuelve los datos al cliente como JSON
      res.json(data);  // Enviamos los datos como una respuesta JSON
    } catch (error) {
      // Maneja cualquier error en la solicitud o en la generación del hash
      res.status(500).json({ error: error.message });  // Si hay error, enviamos un error
    }
  });

  //Filtra los datos por nombre
  app.get('/marvel-data/:nombre', async (req, res) => {
    try {
      // Genera el timestamp (ts) actual
      const ts = new Date().getTime();
      const nombre = req.params.nombre;  // Obtener el nombre del personaje de la URL
      // Genera el hash MD5 utilizando el timestamp, la clave privada y la clave pública
      const hash = generateHash(ts, privateKey, publicKey);
  
      // Construye la URL con los parámetros necesarios
      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${encodeURIComponent(nombre)}`;  
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
      console.log(JSON.stringify(data));
  
    } catch (error) {
      // Maneja cualquier error en la solicitud o en la generación del hash
      res.status(500).json({ error: error.message });  // Si hay error, enviamos un error
    }
  });
  
  // Función para generar el hash MD5 con timestamp, clave privada y clave pública
  function generateHash(ts, privateKey, publicKey) {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex);
  }

  module.exports = app;