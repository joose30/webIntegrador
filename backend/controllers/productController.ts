import { Request, Response } from 'express';
import Product from '../models/productModel';

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;
    const newProduct = new Product({ name, description, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto', error });
  }
};