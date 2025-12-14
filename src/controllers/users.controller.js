import logger from '#config/logger.js';
import { getAllUsers } from '#services/users.services.js';

// fetch all the users using the user service
export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Getting users...');

    const allUsers = await getAllUsers();

    res.json({
      message: "Successfully retrieved users",
      users: allUsers,
      count: allUsers.length,
    })
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export default fetchAllUsers;
