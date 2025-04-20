import React from 'react';
import { ShipmentDetailsProps } from '../types';

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipment }) => {
  return (
    <div className="shipment-details">
      <h2>Shipment Details</h2>
      <div className="details-container">
        <p><strong>ID:</strong> {shipment._id}</p>
        <p><strong>Origin:</strong> {shipment.origin}</p>
        <p><strong>Destination:</strong> {shipment.destination}</p>
      </div>
    </div>
  );
};

export default ShipmentDetails;
