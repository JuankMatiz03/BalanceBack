
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from '@routes/auth.routes';
import { notFoundMiddleware } from '@middlewares/notFound.middleware';
import { errorMiddleware } from '@middlewares/error.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// healthcheck
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/debt', authMiddleware, authRoutes);

// middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

