// setting up express application with middleware
import logger from '#config/logger.js';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet()); // middleware for security headers
app.use(express.json()); // middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded bodies

// setup morgan to use winston for logging
// passing morgan logs to winston logger
app.use(
  morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } })
); // logging middleware

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions API');
  res.status(200).send('Hello, from Acquisitions!');
});

export default app;
