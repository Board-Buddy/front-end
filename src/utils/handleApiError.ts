import { CustomError } from '@/types/api';
import axios from 'axios';
import { errorToast } from './customToast';
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Axios 에러인 경우
    if (error.response) {
      // // error.response가 존재하면
      const errorResponse = error.response?.data as CustomError;

      // 의도한 에러 처리
      errorToast('axios error', errorResponse.message);
    } else {
      // error.response가 존재하지 않는 경우에는 서버 연결이 원활하지 않은 것으로 간주
      errorToast('server error', '서버 연결이 원활하지 않습니다.');
    }
  } else {
    // Axios 에러가 아닌 경우에는 네트워크 연결 오류나 기타 오류로 간주
    errorToast(
      'network error',
      '네트워크 연결 오류 또는 기타 오류가 발생했습니다.',
    );
  }
};

export default handleApiError;
