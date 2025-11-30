import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1d';

// utility functions for signing and verifying JWT tokens
export const jwttoken = {
  // sign a JWT token
  sign: (payload) => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      logger.error('Failed to authenticate JWT token', error);
      throw new Error('Failed to authenticate JWT token');
    }
  },
  // verify a JWT token
  verify: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      logger.error('Invalid JWT token', error);
      throw new Error('Invalid JWT token');
    }
  },
};
