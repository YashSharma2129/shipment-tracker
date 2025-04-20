import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

const handleValidation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ 
      message: 'Validation Error',
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg
      }))
    });
    return; // 🔥 key fix
  }
  next();
};

export const validateShipment: RequestHandler[] = [
  body('origin')
    .notEmpty().withMessage('Origin is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Origin must be at least 2 characters'),
  body('destination')
    .notEmpty().withMessage('Destination is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Destination must be at least 2 characters'),
  body('statusUpdates').isArray().withMessage('Status updates must be an array'),
  body('statusUpdates.*.status').notEmpty().withMessage('Status is required'),
  body('statusUpdates.*.location').notEmpty().withMessage('Location is required'),
  handleValidation,
];

export const validateStatusUpdate: RequestHandler[] = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Status must be at least 2 characters'),
  body('location')
    .notEmpty().withMessage('Location is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Location must be at least 2 characters'),
  body('timestamp')
    .optional()
    .isISO8601().withMessage('Invalid timestamp format'),
  handleValidation,
];
