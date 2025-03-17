// empresaRoutes.ts
import express from 'express';
import { Router } from 'express';
import {
    updateEmpresa,
    addPregunta,
    addMision,
    addVision,
    addValor,
    addPolitica,

    getEmpresa,
    getPreguntas,
    getMisions,
    getVisions,
    getValors,
    getPoliticas
} from '../controllers/empresaController';

const router: Router = express.Router();

// Definir las rutas con un prefijo consistente
router.put('/empresa/actualizar', updateEmpresa);
router.post('/empresa/preguntas', addPregunta);
router.post('/empresa/misiones', addMision);
router.post('/empresa/visiones', addVision);
router.post('/empresa/valores', addValor);
router.post('/empresa/politicas', addPolitica);

// =======================
// Rutas GET para recuperar datos
// =======================
router.get('/empresa', getEmpresa);
router.get('/empresa/preguntas', getPreguntas);
router.get('/empresa/misiones', getMisions);
router.get('/empresa/visiones', getVisions);
router.get('/empresa/valores', getValors);
router.get('/empresa/politicas', getPoliticas);

// Agregar un manejador de errores específico para estas rutas
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error en rutas de empresa:', err);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
    });
});

export default router;
