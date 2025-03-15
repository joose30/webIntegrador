import { Request, Response } from 'express';
import { Empresa, Pregunta, Mision, Vision, Valor, Politica } from '../models/empresaModel';

// Controlador para actualizar datos de la empresa
export const updateEmpresa = async (req: Request, res: Response) => {
    try {
        const { ubicacion, telefono } = req.body;

        const empresa = await Empresa.findOneAndUpdate(
            {},
            { ubicacion, telefono },
            { new: true, upsert: true }
        );

        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando empresa', error });
    }
};

// Factory function para crear elementos
const createElementHandler = (Model: any) => async (req: Request, res: Response) => {
    try {
        const newElement = new Model(req.body);
        await newElement.save();
        res.status(201).json(newElement);
    } catch (error) {
        res.status(500).json({ message: `Error creando ${Model.modelName}`, error });
    }
};

export const addPregunta = createElementHandler(Pregunta);
export const addMision = createElementHandler(Mision);
export const addVision = createElementHandler(Vision);
export const addValor = createElementHandler(Valor);
export const addPolitica = createElementHandler(Politica);