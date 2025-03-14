import express, { Router, RequestHandler } from 'express';
import { addProduct } from '../controllers/productController';

const router: Router = express.Router();

router.post('/add', addProduct as RequestHandler);

export default router;