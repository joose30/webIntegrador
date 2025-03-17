import { Request, Response } from 'express';
import { Empresa, Pregunta, Mision, Vision, Valor, Politica } from '../models/empresaModel';

// =======================
// NUEVOS ENDPOINTS GET
// =======================

// Recupera la información de la empresa (ubicación y teléfono)
export const getEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findOne({});
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo empresa', error });
    }
};

// Recupera todas las preguntas (pregunta y respuesta)
export const getPreguntas = async (req: Request, res: Response) => {
    try {
        const preguntas = await Pregunta.find({});
        res.status(200).json(preguntas);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo preguntas', error });
    }
};

// Recupera todas las misions (la colección se llama "misions" en tu BD)
export const getMisions = async (req: Request, res: Response) => {
    try {
        const misions = await Mision.find({});
        res.status(200).json(misions);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo misions', error });
    }
};

// Recupera todas las visions (colección "visions")
export const getVisions = async (req: Request, res: Response) => {
    try {
        const visions = await Vision.find({});
        res.status(200).json(visions);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo visions', error });
    }
};

// Recupera todos los valores (modelo Valor, colección por defecto "valors")
export const getValors = async (req: Request, res: Response) => {
    try {
        const valors = await Valor.find({});
        res.status(200).json(valors);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo valors', error });
    }
};

// Recupera todas las politicas (colección "politicas")
export const getPoliticas = async (req: Request, res: Response) => {
    try {
        const politicas = await Politica.find({});
        res.status(200).json(politicas);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo politicas', error });
    }
};

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
