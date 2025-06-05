import { CustomAxiosError } from '@/types/api';
import { errorToast } from './customToast';

const handleApiError = (error: unknown) => {
  if (error instanceof CustomAxiosError) {
    errorToast(error.name, error.message);
  }
};

export default handleApiError;
