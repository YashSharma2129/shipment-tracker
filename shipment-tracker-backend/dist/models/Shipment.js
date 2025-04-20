import mongoose from 'mongoose';
const statusUpdateSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});
const shipmentSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    statusUpdates: [statusUpdateSchema]
}, {
    timestamps: true
});
export default mongoose.model('Shipment', shipmentSchema);
