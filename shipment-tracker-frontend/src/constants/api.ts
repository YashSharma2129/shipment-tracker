export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const ENDPOINTS = {
    TRACK_SHIPMENT: (id: string) => `${API_BASE_URL}/shipments/${id}/track`,
    CREATE_SHIPMENT: `${API_BASE_URL}/shipments`,
} as const;
