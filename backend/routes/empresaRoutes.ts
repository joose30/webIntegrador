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

// Cambiar las rutas para usar prefijos consistentes
router.put('/empresa/actualizar', updateEmpresa);
router.post('/empresa/preguntas', addPregunta);
router.post('/empresa/misiones', addMision);
router.post('/empresa/visiones', addVision);
router.post('/empresa/valores', addValor);
router.post('/empresa/politicas', addPolitica);

export default router;