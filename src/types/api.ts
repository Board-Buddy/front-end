import { AxiosError, AxiosResponse } from 'axios';

interface ApiResponse {
  status: string;
  message: string;
}

// 서버에서 내려주는 성공 응답 타입
export interface SuccessResponse<T> extends ApiResponse {
  status: 'success';
  data: T;
}

// 서버에서 내려주는 에러 응답 타입
export interface ErrorResponse extends ApiResponse {
  status: 'failure' | 'error';
  data: null;
}

// 런타임에 ErrorResponse 타입인지 검사하는 타입가드 함수
export const isErrorResponse = (data: unknown): data is ErrorResponse =>
  data !== null &&
  typeof data === 'object' &&
  'status' in data &&
  (data.status === 'failure' || data.status === 'error') &&
  'message' in data &&
  typeof data.message === 'string' &&
  'data' in data &&
  data.data === null;

// AxiosError 확장 클래스
export class CustomAxiosError extends AxiosError<ErrorResponse> {
  constructor(
    originalError: AxiosError,
    public name:
      | 'business error'
      | 'unexpected error'
      | 'server error'
      | 'network error',
    message: string,
  ) {
    super(
      message,
      originalError.code,
      originalError.config,
      originalError.request,
      originalError.response as AxiosResponse<ErrorResponse>,
    );

    this.cause = originalError;
  }
}

// 무한스크롤 전용 data 타입
export interface InfiniteScrollResponseData<T> {
  dataList: T[];
  hasMore: boolean;
  nextCursor: string | null;
}
