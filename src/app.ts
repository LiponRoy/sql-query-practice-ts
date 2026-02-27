import express from 'express';
import customerRoutes from './routes/customer.routes';
import productRouter from './routes/product.routes';

const app = express();

app.use(express.json());
app.use('/customers', customerRoutes);
app.use('/product', productRouter);

export default app;
