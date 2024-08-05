'use client';

import { API_BASE_URL } from '@/constants/env';
import { BellIcon } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const NotificationProvider = () => {
  const notify = (message: string) => {
    toast(message, {
      icon: <BellIcon />,
      style: {
        fontSize: '14px',
        fontWeight: '600',
        border: '1px solid var(--main-color)',
        color: 'var(--main-color)',
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

    eventSource.onmessage = (event) => {
      const newNotification = event.data;
      notify(newNotification);
    };

    eventSource.onerror = (error) => {
      console.log('SSE error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return <></>;
};

export default NotificationProvider;
