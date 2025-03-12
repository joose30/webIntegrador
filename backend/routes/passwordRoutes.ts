import express from 'express';
import { registerPassword, listPasswords } from '../controllers/passwordController';

const router = express.Router();

router.post('/register', registerPassword); // Ruta para registrar contraseñas
router.get('/list', listPasswords); // Ruta para listar contraseñas

export default router;