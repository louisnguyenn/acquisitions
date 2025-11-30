import { signup } from '#controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

// Auth routes
router.post('/sign-up', signup);  // POST /api/auth/sign-up
                                  // handled by signup controller from auth.controller.js

router.post('/sign-in', (req, res) => {
  res.send('POST /api/auth/sign-in response');
});

router.post('/sign-out', (req, res) => {
  res.send('POST /api/auth/sign-out response');
});

export default router;
