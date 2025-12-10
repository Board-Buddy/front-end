import { ErrorResponse, SuccessResponse } from '@/types/api';
import { API_BASE_URL } from './../services/endpoint';
import { DefaultBodyType, http, HttpResponseResolver, PathParams } from 'msw';

interface CreateMockHandlerParams<T> {
  method: keyof typeof http;
  endpoint: string;
  handler: HttpResponseResolver<
    PathParams,
    DefaultBodyType,
    SuccessResponse<T> | ErrorResponse
  >;
}

export const createMockHandler = <T>({
  method,
  endpoint,
  handler,
}: CreateMockHandlerParams<T>) =>
  http[method](`${API_BASE_URL}${endpoint}`, handler);
