import logger from '#config/logger.js';
import bcrypt from 'bcrypt';

// this function hashes a plain text password to encrypt user passwords before storing them in the database
export const hashPassword = async (password) => {
  try {
    // hash the password using bcrypt
    // 10 salt rounds
    return await bcrypt.hash(password, 10);
  } catch (error) {
    // logging the error
    logger.error(`Error hashing the password: ${error}`);
    throw new Error('Error hasing the password');
  }
};
