import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../common/FormInput';
import { createShipment } from '../../services/shipmentService';
import { CreateShipmentForm as ICreateShipmentForm, FormStatus } from '../../types';

const initialFormData: ICreateShipmentForm = {
  origin: '',
  destination: '',
  initialStatus: 'Pending',
  initialLocation: ''
};

const CreateShipmentForm: React.FC = () => {
  const [formData, setFormData] = useState<ICreateShipmentForm>(initialFormData);
  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(null);

    try {
      const response = await createShipment({
        origin: formData.origin,
        destination: formData.destination,
        statusUpdates: [{
          status: formData.initialStatus,
          location: formData.initialLocation || formData.origin,
          timestamp: new Date().toISOString()
        }]
      });

      setFormStatus({
        success: true,
        message: `Shipment created successfully! ID: ${response._id}`
      });
      
      setTimeout(() => {
        navigate(`/track/${response._id}`);
      }, 1500);
    } catch (error: any) {
      setFormStatus({
        success: false,
        message: 'Failed to create shipment',
        errors: error.response?.data?.errors?.reduce((acc: any, err: any) => {
          acc[err.field] = err.message;
          return acc;
        }, {})
      });
    }
  };

  const updateField = (field: keyof ICreateShipmentForm) => (value: string) => {
    setFormData((prev: ICreateShipmentForm) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="create-shipment-form">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Origin"
          value={formData.origin}
          onChange={updateField('origin')}
          error={formStatus?.errors?.origin}
          required
        />
        <FormInput
          label="Destination"
          value={formData.destination}
          onChange={updateField('destination')}
          error={formStatus?.errors?.destination}
          required
        />
        <FormInput
          label="Initial Status"
          value={formData.initialStatus}
          onChange={updateField('initialStatus')}
          error={formStatus?.errors?.initialStatus}
          required
        />
        <FormInput
          label="Initial Location"
          value={formData.initialLocation}
          onChange={updateField('initialLocation')}
          error={formStatus?.errors?.initialLocation}
          placeholder={formData.origin}
        />
        <button type="submit" className="submit-button">Create Shipment</button>
      </form>
      {formStatus && (
        <div className={`form-status ${formStatus.success ? 'success' : 'error'}`}>
          {formStatus.message}
        </div>
      )}
    </div>
  );
};

export default CreateShipmentForm;
