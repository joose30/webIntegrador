import { Request, Response } from 'express';
import Device from '../models/Device';

/**
 * Registrar un nuevo dispositivo IoT asociado al usuario autenticado
 */
export const registerDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        // Se asume que el middleware de autenticación asigna el usuario a req.user
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ error: 'Usuario no autenticado' });
            return;
        }

        const { macAddress, name, location } = req.body;

        // Verificar si el dispositivo ya existe
        const existingDevice = await Device.findOne({ macAddress });
        if (existingDevice) {
            res.status(400).json({ error: 'El dispositivo ya está registrado' });
            return;
        }

        // Crear nuevo dispositivo asociándolo al usuario autenticado
        const newDevice = new Device({
            macAddress,
            name,
            location,
            user: userId
        });

        await newDevice.save();
        res.status(201).json({ message: 'Dispositivo registrado correctamente', device: newDevice });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el dispositivo' });
    }
};

/**
 * Obtener todos los dispositivos IoT
 */
export const getDevices = async (req: Request, res: Response): Promise<void> => {
    try {
        const devices = await Device.find().populate('user', 'email name'); // Ejemplo: muestra email y name del usuario asociado
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener dispositivos' });
    }
};
