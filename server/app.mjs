import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './DB/DBconfig.mjs';
import gamesRoutes from './routes/gamesRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoints de API
app.use('/api', gamesRoutes);

// Manejo de ruta no encontrada (404 JSON)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicialización de base de datos y servidor
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
  });
};

startServer();

export default app;

