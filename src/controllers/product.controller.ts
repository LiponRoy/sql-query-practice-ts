import { Request, Response } from 'express';
import { pool } from '../config/db';
import { IProduct } from '../types/customer.types';

export const createProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                error: 'Name, price are required',
            });
        }
        const result = await pool.query(
            `INSERT INTO product (name, price)
       VALUES ($1, $2)
       RETURNING *`,
            [name, price],
        );

        res.status(201).json({
            message: 'Product created successfully',
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
