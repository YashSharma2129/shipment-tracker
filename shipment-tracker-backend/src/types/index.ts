import { Request, Response } from 'express';
import { Document } from 'mongoose';

export interface StatusUpdate {
  status: string;
  location: string;
  timestamp: Date;
}

export interface IShipment extends Document {
  origin: string;
  destination: string;
  statusUpdates: StatusUpdate[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TypedRequest<T> extends Request {
  body: T;
}

export interface CreateShipmentBody {
  origin: string;
  destination: string;
  statusUpdates: StatusUpdate[];
}

export interface AddStatusUpdateBody {
  status: string;
  location: string;
  timestamp?: string;
}
