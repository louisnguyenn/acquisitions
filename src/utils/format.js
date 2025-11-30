// this utility function formats validation errors into a readable string
export const formatValidationErrors = (errors) => {
  // return generic message if no issues found
  if (!errors || !errors.issues) {
    return 'Validation failed';
  }

  // handle Zod validation errors and join the errors seperated by commas
  if (Array.isArray(errors.issues)) {
    return errors.issues.map((issue) => issue.message).join(', ');
  }

  // if not an array of issues, return the stringified version of errors
  return JSON.stringify(errors);
};
