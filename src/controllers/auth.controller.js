import logger from '#config/logger.js';
import { createUser } from "#services/auth.service.js";
import { formatValidationErrors } from '#utils/format.js';

export const signup = async (req, res, next) => {
  try {
    // validate the data coming into the form
    // req.body contains the user form data
    const validationResult = signupSchema.safeParse(req.body);

    // if validation fails, return 400 with the formatted errors
    if (!validationResult.success) {
      return res.status(400).json({
        error: formattedErrors,
        details: formatValidationErrors(validationResult.error),
      });
    }

    // extract validated data
    const { name, email, password, role } = validationResult.data;

    // calling auth service to create an account
    const user = await createUser({ name, email, password, role})

    const token = jwt

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: 1,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    logger.error('Signup error:', error);

    if (error.message === 'User already exists') {
      return res.status(409).json({ error: 'User already exists' });
    }

    // forward error using next()
    next(error);
  }
};
