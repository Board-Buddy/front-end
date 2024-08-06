import { CustomError } from '@/types/api';
import axios from 'axios';
import toast from 'react-hot-toast';

export const notify = (id: string, message: string) => {
  toast.error(message, {
    id,
    style: {
      fontSize: '14px',
      fontWeight: '600',
      border: '1px solid var(--main-color)',
      color: 'var(--main-color)',
    },
    iconTheme: {
      primary: 'var(--main-color)',
      secondary: '#FFFAEE',
    },
  });
};

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Axios 에러인 경우
    if (error.response) {
      // // error.response가 존재하면
      const errorResponse = error.response?.data as CustomError;

      // 의도한 에러 처리
      notify('axios error', errorResponse.message);
    } else {
      // error.response가 존재하지 않는 경우에는 서버 연결이 원활하지 않은 것으로 간주
      notify('server error', '서버 연결이 원활하지 않습니다.');
    }
  } else {
    // Axios 에러가 아닌 경우에는 네트워크 연결 오류나 기타 오류로 간주
    notify(
      'network error',
      '네트워크 연결 오류 또는 기타 오류가 발생했습니다.',
    );
  }
};

export default handleApiError;
