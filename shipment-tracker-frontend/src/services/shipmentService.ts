import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { Shipment, CreateShipmentData } from '../types';

export const trackShipment = async (id: string): Promise<Shipment> => {
  const response = await axios.get<Shipment>(`${API_BASE_URL}/shipments/${id}/track`);
  return response.data;
};

export const createShipment = async (data: CreateShipmentData): Promise<Shipment> => {
  const response = await axios.post<Shipment>(`${API_BASE_URL}/shipments`, data);
  return response.data;
};
