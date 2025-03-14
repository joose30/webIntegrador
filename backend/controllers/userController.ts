import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

// Tipado explícito para las funciones del controlador
export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, lastName, surname, phone, email, password } = req.body;
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
        next(error);
    }
};

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};