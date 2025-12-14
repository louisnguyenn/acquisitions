import { db } from '#config/database.js';
import logger from '#config/logger.js';
import { users } from '#models/user.model.js';

export const getAllUsers = async () => {
  try {
    // retreiving specific user fields from the db
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users);

    return allUsers;
  } catch (error) {
    logger.error('Error getting users', error);
    throw error;
  }
};
