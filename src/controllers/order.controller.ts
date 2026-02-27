import { Request, Response } from 'express';
import { pool } from '../config/db';
// import { IProduct } from '../types/customer.types';

export const createOrders = async (req: Request<{}, {}, any>, res: Response) => {
    try {
        const { customer_id, product_id, total, quantity } = req.body;

        if (!customer_id || !product_id || !total || !quantity) {
            return res.status(400).json({
                error: 'customer_id,product_id,total,quantity are required',
            });
        }
        const result = await pool.query(
            `INSERT INTO orders (customer_id,product_id,total,quantity)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
            [customer_id, product_id, total, quantity],
        );

        res.status(201).json({
            message: 'Orders created successfully',
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
