import { Request, Response } from 'express';
import { Empresa, Pregunta, Mision, Vision, Valor, Politica } from '../models/empresaModel';

// Controlador para actualizar todos los datos de la empresa
export const updateEmpresaData = async (req: Request, res: Response) => {
    try {
        const {
            ubicacion,
            telefono,
            mision,
            vision,
            valores,
            politicas
        } = req.body; // Recibimos todos los campos a actualizar

        // Actualizamos los datos de la empresa
        const empresa = await Empresa.findOneAndUpdate(
            {},  // Deberías ajustar esto si tienes más de una empresa
            { ubicacion, telefono },
            { new: true, upsert: true }
        );

        // Actualizamos las colecciones relacionadas
        await Mision.findOneAndUpdate({}, { contenido: mision }, { new: true });
        await Vision.findOneAndUpdate({}, { contenido: vision }, { new: true });
        await Valor.findOneAndUpdate({}, { contenido: valores }, { new: true });
        await Politica.findOneAndUpdate({}, { contenido: politicas }, { new: true });

        res.status(200).json({ message: 'Datos de la empresa actualizados correctamente', empresa });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando los datos de la empresa', error });
    }
};
