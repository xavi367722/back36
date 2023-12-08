const express = require("express");
const cors = require("cors");
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());
app.use(express.json());

// Importar y usar las rutas de comidas
const comidaRoutes = require("./routes/comidas.routes");
app.use("/comidas", comidaRoutes);

// Otro middleware y configuraciones...

// Iniciar el servidor
const PORT = process.env.PORT || 3003; //esto
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});






app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});