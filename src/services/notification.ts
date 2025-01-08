import api from '@/services';

/** 알림 리스트 조회 API */
export const getNotificationList = () =>
  api
    .get('/notifications')
    .then((response) => response.data.data.notifications);
