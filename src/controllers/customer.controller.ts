import { Request, Response } from 'express';
import { pool } from '../config/db';
import { Customer } from '../types/customer.types';

export const createCustomer = async (req: Request<{}, {}, Customer>, res: Response) => {
    try {
        const { name, email, phone, city, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({
                error: 'Name, email and age are required',
            });
        }

        const result = await pool.query(
            `INSERT INTO customers (name, email, phone, city, age)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [name, email, phone, city, age],
        );

        res.status(201).json({
            message: 'Customer created successfully',
            data: result.rows[0],
        });
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Email already exists' });
        }

        res.status(500).json({ error: 'Server error' });
    }
};

export const getCustomers = async (_req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
