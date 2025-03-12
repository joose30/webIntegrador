import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, surname, phone, email, password } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            lastName,
            surname,
            phone,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};