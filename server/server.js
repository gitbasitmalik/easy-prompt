import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/db.js';
import routes from './routes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// DB Connection
connectDB();

// Routes
app.use('/api/auth', routes);

app.get('/test', (req, res) => {
  res.json({ msg: 'Test route is working!' });
});
app.get('/', (req, res) => {
  res.json({ msg: 'API is running!' });
});
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});