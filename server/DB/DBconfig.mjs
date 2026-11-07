import { setServers } from 'node:dns/promises';

setServers(['1.1.1.1', '8.8.8.8']);

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_DB_URL;
    if (!uri) {
      throw new Error('No se encontró MONGODB_URI en las variables de entorno.');
    }

    await mongoose.connect(uri);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Falló la conexión a la base de datos:', error.message);
    process.exit(1);
  }
};

