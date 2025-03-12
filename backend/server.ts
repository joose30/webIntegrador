import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import fingerprintRoutes from './routes/fingerprintRoutes';
import passwordRoutes from './routes/passwordRoutes';
import userRoutes from './routes/userRoutes'

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));


// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/fingerprints', fingerprintRoutes);
app.use('/api/passwords', passwordRoutes); // Monta las rutas de contraseñas
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



