import React, { useState, FormEvent } from 'react';
import FormInput from './common/FormInput';
import { createShipment } from '../services/shipmentService';

interface FormData {
  origin: string;
  destination: string;
  status: string;
}

const CreateShipment: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    destination: '',
    status: ''
  });
  const [shipmentId, setShipmentId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await createShipment({
        ...formData,
        statusUpdates: [{
          status: formData.status,
          location: `${formData.origin} Warehouse`,
          timestamp: new Date().toISOString(),
        }],
      });

      setShipmentId(response._id);
      alert(`Shipment Created! ID: ${response._id}`);
    } catch (error) {
      console.error('Error creating shipment:', error);
      alert('Failed to create shipment');
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2>Create Shipment</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Origin"
          value={formData.origin}
          onChange={(value) => updateField('origin', value)}
          required
        />
        <FormInput
          label="Destination"
          value={formData.destination}
          onChange={(value) => updateField('destination', value)}
          required
        />
        <FormInput
          label="Initial Status"
          value={formData.status}
          onChange={(value) => updateField('status', value)}
          required
        />
        <button type="submit">Create Shipment</button>
      </form>
      {shipmentId && (
        <p>Shipment created successfully! ID: {shipmentId}</p>
      )}
    </div>
  );
};

export default CreateShipment;
