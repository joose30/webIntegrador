import express, { Router } from 'express';
import { registerUser, getUserById, updateUser } from "../controllers/userController";

const router: Router = express.Router();

router.post('/register', registerUser);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);

export default router;