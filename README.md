# Simple Shipment Tracker

A full-stack shipment tracking application that allows users to track shipments and view their status updates chronologically. Built with React, Express.js, and MongoDB.

## Features

- Track shipments using a unique ID
- View detailed shipment information (origin, destination)
- Chronological timeline of status updates
- Material-UI based responsive design
- Error handling and validation
- Docker support for easy deployment

## Why MongoDB?

MongoDB was chosen for this project because:
1. Natural document structure for shipments with embedded status updates
2. Efficient querying of hierarchical data
3. Flexible schema for future extensions
4. Easy setup and integration with Express.js
5. Great support for arrays (status updates) and sorting

## Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd simple-shipment-tracker
```

2. Start all services:
```bash
docker-compose up --build
```

3. Seed the database (in a new terminal):
```bash
docker-compose exec backend npm run seed
```

4. Note down the shipment IDs displayed in the console after seeding

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Manual Setup

### Backend Setup

1. Navigate to backend directory and install dependencies:
```bash
cd shipment-tracker-backend
npm install
```

2. Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/shipment-tracker
PORT=3001
NODE_ENV=development
```

3. Start MongoDB locally

4. Start the server:
```bash
npm run dev
```

5. Seed the database:
```bash
# On Unix/Linux/Mac:
npm run seed

# On Windows:
.\seed
```

### Frontend Setup

1. Navigate to frontend directory and install dependencies:
```bash
cd ../shipment-tracker-frontend
npm install
```

2. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:3001
```

3. Start the development server:
```bash
npm start
```

## Testing the Application

1. After seeding the database, copy one of the shipment IDs from the console output

2. Visit http://localhost:3000 

3. Enter the copied shipment ID in the tracking form

4. View the shipment details and status timeline

### Sample Data

The seeding script creates two example shipments:

1. New York to Los Angeles shipment:
   - Multiple status updates showing a complete delivery journey
   - Demonstrates timeline progression

2. Seattle to Miami shipment:
   - Early-stage shipment with initial status updates
   - Shows pending state

## Project Structure

```
simple-shipment-tracker/
├── shipment-tracker-frontend/   # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── common/        # Shared components
│   │   │   └── pages/         # Page components
│   │   ├── services/          # API services
│   │   └── types/            # TypeScript interfaces
│   └── package.json
├── shipment-tracker-backend/    # Express.js backend
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   └── scripts/          # Database seeding
│   └── package.json
└── docker-compose.yml          # Docker configuration
```

## API Endpoints

### Track Shipment
```
GET /shipments/{shipmentId}/track
```
Returns shipment details and chronologically ordered status updates.

### Add Status Update (Development Only)
```
POST /shipments/{shipmentId}/status
```
Adds a new status update to an existing shipment. Example request:
```json
{
  "status": "In Transit",
  "location": "Chicago Hub",
  "timestamp": "2023-12-10T15:30:00Z"
}
```

## Running Tests

Backend tests:
```bash
cd shipment-tracker-backend
npm test
```

## Technical Details

### Features Implemented
- ✓ Two main pages (TrackingInputPage, TrackingResultPage)
- ✓ Four core components (ShipmentIdForm, ShipmentDetails, StatusTimeline, StatusUpdateItem)
- ✓ RESTful API endpoints
- ✓ Chronological ordering of status updates
- ✓ Error handling (404 for invalid shipments)
- ✓ Data validation
- ✓ Database seeding
- ✓ Material-UI integration
- ✓ TypeScript throughout
- ✓ Docker support

### Bonus Features
- ✓ Docker Compose setup
- ✓ Prominent latest status display
- ✓ Frontend validation
- ✓ Enhanced timeline visualization
- ✓ Backend tests
- ✓ Frontend error handling

## Assumptions Made
1. Timestamps are stored in UTC
2. Status updates cannot be modified once created
3. Shipment IDs are MongoDB ObjectIds
4. Frontend runs on port 3000, backend on 3001
5. All status updates belong to a single shipment

## License

This project is licensed under the MIT License.
