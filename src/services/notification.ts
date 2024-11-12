import api from '@/services';

/** 알림 리스트 조회 API */
export const getNotificationList = () =>
  api
    .get('/v1/notifications')
    .then((response) => response.data.data.notifications);
