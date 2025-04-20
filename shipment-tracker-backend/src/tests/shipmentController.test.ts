import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../index';
import Shipment from '../models/Shipment';

beforeAll(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shipment-tracker-test';
  await mongoose.connect(mongoURI);
});

afterEach(async () => {
  await Shipment.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Shipment Controller', () => {
  test('GET /shipments/:id/track - should return shipment', async () => {
    const shipment = await Shipment.create({
      origin: 'Test Origin',
      destination: 'Test Destination',
      statusUpdates: [{
        status: 'Pending',
        location: 'Warehouse',
        timestamp: new Date()
      }]
    });

    const response = await request(app)
      .get(`/shipments/${shipment._id}/track`)
      .expect(200);

    expect(response.body._id).toBe(shipment._id.toString());
  });

  test('POST /shipments/:id/status - should add status update', async () => {
    const shipment = await Shipment.create({
      origin: 'Test Origin',
      destination: 'Test Destination',
      statusUpdates: []
    });

    const newStatus = {
      status: 'In Transit',
      location: 'Distribution Center',
      timestamp: new Date().toISOString()
    };

    const response = await request(app)
      .post(`/shipments/${shipment._id}/status`)
      .send(newStatus)
      .expect(200);

    expect(response.body.statusUpdates).toHaveLength(1);
    expect(response.body.statusUpdates[0].status).toBe(newStatus.status);
  });
});
