import express from 'express';
import {
    registerUser,
    getUserById,
    updateUser
} from '../controllers/userController';

const router = express.Router();

// Rutas actualizadas con tipado correcto
router.post('/register', registerUser);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);

export default router;
