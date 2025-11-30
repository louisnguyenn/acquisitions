import { db } from '#config/database.js';
import logger from '#config/logger.js';
import { users } from '#models/user.model.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

// this function hashes a plain text password to encrypt user passwords before storing them in the database
export const hashPassword = async (password) => {
  try {
    // hash the password using bcrypt
    // 10 salt rounds
    return await bcrypt.hash(password, 10);
  } catch (error) {
    // logging the error
    logger.error(`Error hashing the password: ${error}`);
    throw new Error('Error hashing the password');
  }
};

export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    // check if user exists in the database
    const existingUser = db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // check if user already exists
    if (existingUser.length > 0) {
      throw new Error('User already exists');
    }

    const passwordHash = await hashPassword(password); // call hash password function

    // insert new user into the database
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash,
        role,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
      });

    // log the new user info
    logger.info(`User ${newUser.email} created successfully`);
    return newUser;
  } catch (error) {
    // log the error
    logger.error(`Error creating user: ${error}`);
    throw new Error('Error creating user');
  }
};
