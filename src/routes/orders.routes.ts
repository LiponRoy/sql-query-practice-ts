import { Router } from 'express';
import { createOrders } from '../controllers/order.controller';

const ordersRouter = Router();

ordersRouter.post('/', createOrders);

export default ordersRouter;
