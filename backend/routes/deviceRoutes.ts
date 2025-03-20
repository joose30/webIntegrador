import { Router } from 'express';
import { registerDevice, getDevices } from '../controllers/deviceController';
import { verifyToken } from '../models/authMiddleware';

const router = Router();

// Ruta protegida para registrar dispositivo
router.post('/register', verifyToken, registerDevice);
// Ruta protegida para obtener dispositivos
router.get('/', verifyToken, getDevices);

export default router;
 