import React, { useState, FormEvent } from 'react';
import FormInput from './common/FormInput';
import { trackShipment } from '../services/shipmentService';
import { Shipment, StatusUpdate } from '../types';

interface ShipmentDetailsProps {
  shipmentData: Shipment;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipmentData }) => {
  const getLatestStatus = (): StatusUpdate | null => {
    if (!shipmentData?.statusUpdates?.length) return null;
    return shipmentData.statusUpdates[shipmentData.statusUpdates.length - 1];
  };

  const latestStatus = getLatestStatus();

  return (
    <div>
      <h2>Shipment Details</h2>
      <p>Origin: {shipmentData.origin}</p>
      <p>Destination: {shipmentData.destination}</p>
      {latestStatus && (
        <div>
          <h3>Latest Status</h3>
          <p>Status: {latestStatus.status}</p>
          <p>Location: {latestStatus.location}</p>
          <p>Time: {new Date(latestStatus.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

const TrackShipment: React.FC = () => {
  const [shipmentId, setShipmentId] = useState<string>('');
  const [shipmentData, setShipmentData] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await trackShipment(shipmentId);
      setShipmentData(data);
    } catch (error) {
      console.error('Error tracking shipment:', error);
      setError('Failed to track shipment. Please check the ID and try again.');
      setShipmentData(null);
    }
  };

  return (
    <div>
      <h2>Track Shipment</h2>
      <form onSubmit={handleTrack}>
        <FormInput
          label="Shipment ID"
          value={shipmentId}
          onChange={setShipmentId}
          required
        />
        <button type="submit">Track</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shipmentData && <ShipmentDetails shipmentData={shipmentData} />}
    </div>
  );
};

export default TrackShipment;
