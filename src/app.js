import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import favoriteRoutes from './routes/favorites.routes.js';

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(favoriteRoutes);

export default app;
