import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shipment from '../models/Shipment.js';

dotenv.config();

const sampleShipments = [
  {
    origin: 'New York',
    destination: 'Los Angeles',
    statusUpdates: [
      {
        status: 'Order Placed',
        location: 'New York Warehouse',
        timestamp: new Date('2023-11-15T08:00:00Z')
      },
      {
        status: 'In Transit',
        location: 'Chicago Distribution Center',
        timestamp: new Date('2023-11-16T15:30:00Z')
      },
      {
        status: 'Out for Delivery',
        location: 'Los Angeles',
        timestamp: new Date('2023-11-17T09:45:00Z')
      }
    ]
  },
  {
    origin: 'Seattle',
    destination: 'Miami',
    statusUpdates: [
      {
        status: 'Order Received',
        location: 'Seattle Hub',
        timestamp: new Date('2023-11-16T10:00:00Z')
      },
      {
        status: 'Processing',
        location: 'Seattle Hub',
        timestamp: new Date('2023-11-16T11:30:00Z')
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shipment-tracker');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Shipment.deleteMany({});
    console.log('Cleared existing shipments');

    // Insert sample shipments
    const createdShipments = await Shipment.insertMany(sampleShipments);
    console.log('Sample shipments created:');
    createdShipments.forEach(shipment => {
      console.log(`ID: ${shipment._id}`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
