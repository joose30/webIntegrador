// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'No se proporcionó token' });
        return;
    }
    const token = authHeader.split(' ')[1]; // Se espera el formato "Bearer <token>"
    if (!token) {
        res.status(401).json({ error: 'Token mal formado' });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ error: 'Token inválido' });
            return;
        }
        // Asignar la información del token (por ejemplo, el id del usuario) a req.user
        req.user = decoded;
        next();
    });
};
