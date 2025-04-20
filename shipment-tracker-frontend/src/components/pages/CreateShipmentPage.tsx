import React from 'react';
import CreateShipmentForm from './CreateShipmentForm';

const CreateShipmentPage: React.FC = () => {
  return (
    <div className="create-shipment-page">
      <h1>Create New Shipment</h1>
      <CreateShipmentForm />
    </div>
  );
};

export default CreateShipmentPage;
