// setting up express application with middleware
import express from 'express';
import logger from "./config/logger.js";

const app = express();

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions API');
  res.status(200).send('Hello, from Acquisitions!');
});

export default app;
