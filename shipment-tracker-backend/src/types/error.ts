import { Error } from 'mongoose';

export interface ValidationError extends Error {
  errors: {
    [key: string]: {
      message: string;
    };
  };
}
