import express, { Router, RequestHandler } from 'express';
import {
    registerUser,
    getUserById,
    updateUser
} from '../controllers/userController';

const router: Router = express.Router();

// Rutas actualizadas con casting explícito para resolver el problema de tipos
router.post('/register', registerUser as RequestHandler);
router.get('/:id', getUserById as RequestHandler);
router.put('/update/:id', updateUser as RequestHandler);

export default router;