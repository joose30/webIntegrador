import { Request, Response } from 'express';
import User from '../models/User';

// Función para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, surname, phone, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        const newUser = new User({
            name,
            lastName,
            surname,
            phone,
            email,
            password // Idealmente deberías encriptar esta contraseña
        });

        await newUser.save();

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            userId: newUser._id
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Función para obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Función para actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { name, lastName, surname, phone, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, lastName, surname, phone, email },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};