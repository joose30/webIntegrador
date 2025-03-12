import { Request, Response } from 'express';
import Password from '../models/Password';

export const registerPassword = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;

        // Guardar la contraseña en la colección "contraseñasPuerta"
        const newPassword = new Password({ password });
        await newPassword.save();

        res.status(201).json(newPassword);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la contraseña' });
    }
    };

    export const listPasswords = async (req: Request, res: Response) => {
    try {
        const passwords = await Password.find(); // Busca en la colección "contraseñasPuerta"
        res.status(200).json(passwords);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar las contraseñas' });
    }
};