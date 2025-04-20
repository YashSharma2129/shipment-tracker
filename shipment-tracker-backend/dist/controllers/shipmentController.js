import Shipment from '../models/Shipment.js';
export const createShipment = async (req, res, next) => {
    try {
        const shipment = new Shipment(req.body);
        await shipment.save();
        res.status(201).json(shipment);
    }
    catch (error) {
        next(error);
    }
};
export const trackShipment = async (req, res, next) => {
    try {
        const shipment = await Shipment.findById(req.params.shipmentId);
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        // Sort status updates by timestamp in descending order (newest first)
        shipment.statusUpdates.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        res.json(shipment);
    }
    catch (error) {
        next(error);
    }
};
export const addStatusUpdate = async (req, res, next) => {
    try {
        const shipment = await Shipment.findById(req.params.shipmentId);
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        shipment.statusUpdates.push({
            status: req.body.status,
            location: req.body.location,
            timestamp: req.body.timestamp || new Date()
        });
        await shipment.save();
        res.json(shipment);
    }
    catch (error) {
        next(error);
    }
};
