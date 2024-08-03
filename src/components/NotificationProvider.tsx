'use client';

import { API_BASE_URL } from '@/constants/env';
import { useEffect } from 'react';

const NotificationProvider = () => {
  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/api/subscribe`);

    eventSource.onmessage = (event) => {
      console.log('Received notification:', event.data);
    };
  });
  return <></>;
};

export default NotificationProvider;
