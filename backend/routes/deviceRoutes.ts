import { Router } from 'express';
import { registerDevice, getDevices } from '../controllers/deviceController';

const router = Router();

// POST /api/devices/register - Registrar dispositivo
router.post('/register', registerDevice);

// GET /api/devices - Obtener lista de dispositivos
router.get('/', getDevices);

export default router;
