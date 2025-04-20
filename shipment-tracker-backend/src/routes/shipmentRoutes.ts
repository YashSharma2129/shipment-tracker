import express, { Request, Response, NextFunction } from 'express';
import {
  createShipment,
  trackShipment,
  addStatusUpdate,
} from '../controllers/shipmentController.js';
import {
  validateShipment,
  validateStatusUpdate,
} from '../middleware/validation.js';

const router = express.Router();

router.post(
  '/',
  validateShipment,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createShipment(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:shipmentId/track',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await trackShipment(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/:shipmentId/status',
  validateStatusUpdate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await addStatusUpdate(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
