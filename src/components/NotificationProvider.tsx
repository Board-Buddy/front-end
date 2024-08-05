'use client';

import { API_BASE_URL } from '@/constants/env';
// import { UserInfo } from '@/types/user';
// import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const NotificationProvider = () => {
  const notify = (message: string) => {
    toast(message, {
      icon: '🔔',
      style: {
        fontSize: '14px',
        fontStyle: '600',
      },
    });
  };

  useEffect(() => {
    const eventSource = new EventSource(
      `${API_BASE_URL}/api/notifications/subscribe`,
      {
        withCredentials: true,
      },
    );

    eventSource.onopen = () => {
      console.log('SSE connection established');
    };

    eventSource.addEventListener('connect', () => {
      console.log('SSE connection established(connect)');
    });

    eventSource.onmessage = (event) => {
      console.log('Received notification(onmessage):', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data;

      notify(newNotificationContent);
    };

    // 참가 신청 이벤트 리스너
    eventSource.addEventListener('applyParticipationApplication', (event) => {
      console.log('Received notification:', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data;

      notify(newNotificationContent);
    });

    // 참가 신청 승인 이벤트 리스너
    eventSource.addEventListener('approveParticipationApplication', (event) => {
      console.log('Received notification:', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data;

      notify(newNotificationContent);
    });

    // 참가 신청 거절 이벤트 리스너
    eventSource.addEventListener('rejectParticipationApplication', (event) => {
      console.log('Received notification:', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data;

      notify(newNotificationContent);
    });

    // 참가 신청 거절 이벤트 리스너
    eventSource.addEventListener('cancelParticipationApplication', (event) => {
      console.log('Received notification:', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data;

      notify(newNotificationContent);
    });

    // 모집글 후기 요청 이벤트 리스너
    eventSource.addEventListener('reviewRequest', (event) => {
      console.log('Received notification:', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data;

      notify(newNotificationContent);
    });

    // 모집글 댓글 작성 이벤트 리스너
    eventSource.addEventListener('writeComment', (event) => {
      console.log('Received notification:', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data;

      notify(newNotificationContent);
    });

    eventSource.onerror = (error) => {
      console.log('SSE error:', error);
    };

    return () => {
      eventSource.close();
    };
  });
  return <></>;
};

export default NotificationProvider;
