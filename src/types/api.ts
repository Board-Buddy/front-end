import { AxiosError } from 'axios';

export interface CustomError extends Error {
  status: string | number;
  data: null;
  message: string;
}

export type AxiosCustomError = AxiosError<CustomError>;
