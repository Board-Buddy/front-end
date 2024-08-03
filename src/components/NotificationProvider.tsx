'use client';

import { API_BASE_URL } from '@/constants/env';
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
    const eventSource = new EventSource(`${API_BASE_URL}/api/subscribe`);

    eventSource.onmessage = (event) => {
      console.log('Received notification:', event.data);

      const newNotification = JSON.parse(event.data);
      const newNotificationContent = newNotification.data.notification.content;

      notify(newNotificationContent);
    };
  });
  return <></>;
};

export default NotificationProvider;
