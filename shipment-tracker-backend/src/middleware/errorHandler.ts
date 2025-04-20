import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../types/error.js';

interface CastError extends Error {
  kind?: string;
}

export const errorHandler = (
  err: Error | ValidationError | CastError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const validationError = err as ValidationError;
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(validationError.errors).map(e => e.message)
    });
  }

  if ('kind' in err && err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
