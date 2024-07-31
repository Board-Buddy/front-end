import axios from 'axios';
import { CustomError } from '@/types/api';

export const handleApiError = (error: unknown): CustomError => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      name: 'Axios Error',
      status: error.response.status,
      message: error.response.data.message || 'Something went wrong',
      data: error.response.data,
    };
  }
  return {
    name: 'Network Error',
    status: 'error',
    message: 'Network Error',
    data: null,
  };
};
