import api from '@/services';
import { API_BASE_URL, ENDPOINT } from './endpoint';

/** 알림 리스트 조회 API */
export const getNotificationList = () =>
  api
    .get(ENDPOINT.NOTIFICATION.LIST())
    .then((response) => response.data.data.notifications);

/** 알림 수신 경로 */
export const SSE_SUBSCRIPTION_URL = ` ${API_BASE_URL}${ENDPOINT.NOTIFICATION.SUBSCRIPTION()}`;
