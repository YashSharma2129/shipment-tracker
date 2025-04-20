export interface StatusUpdate {
  status: string;
  location: string;
  timestamp: string;
}

export interface Shipment {
  _id: string;
  origin: string;
  destination: string;
  statusUpdates: StatusUpdate[];
}

export interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  error?: string;
  placeholder?: string;
}

export interface ShipmentIdFormProps {
  onSubmit: (shipmentId: string) => void;
}

export interface StatusUpdateItemProps {
  update: StatusUpdate;
}

export interface ShipmentDetailsProps {
  shipment: Shipment;
}

export interface CreateShipmentForm {
  origin: string;
  destination: string;
  initialStatus: string;
  initialLocation: string;
}

export interface FormStatus {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string;
  };
}

export interface CreateShipmentData {
  origin: string;
  destination: string;
  statusUpdates: StatusUpdate[];
}
