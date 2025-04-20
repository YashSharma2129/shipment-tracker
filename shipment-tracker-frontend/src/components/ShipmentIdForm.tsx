import React, { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ShipmentIdFormProps } from '../types';
import FormInput from './common/FormInput';

const ShipmentIdForm: React.FC<ShipmentIdFormProps> = ({ onSubmit }) => {
  const [shipmentId, setShipmentId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shipmentId.trim()) {
      onSubmit(shipmentId.trim());
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormInput
          label="Shipment ID"
          value={shipmentId}
          onChange={setShipmentId}
          required
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          sx={{ mt: 2 }}
        >
          Track Shipment
        </Button>
      </Box>
    </Paper>
  );
};

export default ShipmentIdForm;
