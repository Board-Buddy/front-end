import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';
import { searchLocation } from './search';

export const locationHandlers = [searchLocation];
