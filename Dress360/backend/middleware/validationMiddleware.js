import { validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    await validations.run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};
