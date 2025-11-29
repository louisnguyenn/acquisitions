import express from 'express';

const router = express.Router();

router.post('/sign-up', () => {
  res.send('POST /api/auth/sign-up response');
});

router.post('/sign-in', () => {
  res.send('POST /api/auth/sign-in response');
});

router.post('/sign-out', () => {
  res.send('POST /api/auth/sign-out response');
});

export default router;
