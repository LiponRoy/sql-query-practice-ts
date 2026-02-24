import express from 'express';
import customerRoutes from './routes/customer.routes';

const app = express();

app.use(express.json());
app.use('/customers', customerRoutes);

export default app;
