import { body, validationResult } from 'express-validator';
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
export const validateShipment = [
    body('origin').notEmpty().trim(),
    body('destination').notEmpty().trim(),
    handleValidation,
];
export const validateStatusUpdate = [
    body('status').notEmpty().trim(),
    body('location').notEmpty().trim(),
    body('timestamp').optional().isISO8601(),
    handleValidation,
];
