import { Request, Response } from 'express';
import Device from '../models/Device';

/**
 * Registrar un nuevo dispositivo IoT
 */
export const registerDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { macAddress, name, location } = req.body;

        // Verificar si el dispositivo ya existe
        const existingDevice = await Device.findOne({ macAddress });
        if (existingDevice) {
            res.status(400).json({ error: 'El dispositivo ya está registrado' });
            return;
        }

        // Crear nuevo dispositivo
        const newDevice = new Device({
            macAddress,
            name,
            location
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
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener dispositivos' });
    }
};
