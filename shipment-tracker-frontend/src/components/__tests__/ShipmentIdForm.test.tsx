import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ShipmentIdForm from '../ShipmentIdForm';

describe('ShipmentIdForm', () => {
  test('submits shipment ID when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<ShipmentIdForm onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText('Shipment ID:');
    fireEvent.change(input, { target: { value: 'test-id' } });

    const submitButton = screen.getByText('Track Shipment');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('test-id');
  });
});
