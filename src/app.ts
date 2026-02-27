import express from 'express';
import customerRoutes from './routes/customer.routes';
import productRouter from './routes/product.routes';
import ordersRouter from './routes/orders.routes';

const app = express();

app.use(express.json());
app.use('/customers', customerRoutes);
app.use('/product', productRouter);
app.use('/orders', ordersRouter);

export default app;
