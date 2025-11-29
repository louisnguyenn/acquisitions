// setting up express application with middleware
import logger from '#config/logger.js';
import authRoutes from '#routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet()); // middleware for security headers
app.use(cors()); // enable CORS
app.use(express.json()); // middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded bodies

// setup morgan to use winston for logging
// passing morgan logs to winston logger
app.use(
  morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } })
); // logging middleware
app.use(cookieParser()); // middleware to parse cookies

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions API');
  res.status(200).send('Hello, from Acquisitions!');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/api/', (req, res) => {
  res.status(200).json({ message: 'Acquisitions API is running!' });
});

app.use('/api/auth', authRoutes); // auth routes

export default app;
