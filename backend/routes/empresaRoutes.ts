// empresaRoutes.ts
import express from 'express';
import { Router } from 'express';
import {
    updateEmpresa,
    addPregunta,
    addMision,
    addVision,
    addValor,
    addPolitica
} from '../controllers/empresaController';

const router: Router = express.Router();

// Definir las rutas con un prefijo consistente
router.put('/empresa/actualizar', updateEmpresa);
router.post('/empresa/preguntas', addPregunta);
router.post('/empresa/misiones', addMision);
router.post('/empresa/visiones', addVision);
router.post('/empresa/valores', addValor);
router.post('/empresa/politicas', addPolitica);

// Agregar un manejador de errores específico para estas rutas
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error en rutas de empresa:', err);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
    });
});

export default router;
