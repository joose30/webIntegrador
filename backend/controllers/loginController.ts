import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Comparar la contraseña ingresada con la contraseña encriptada almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        // Convertir a objeto para eliminar el campo de la contraseña antes de enviar la respuesta
        const userResponse: { password?: string } = user.toObject();
        delete userResponse.password;
        return res.status(200).json(userResponse);
    } catch (error) {
        next(error);
    }
};