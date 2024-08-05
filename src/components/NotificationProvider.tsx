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

    // 참가 신청 이벤트 리스너
    eventSource.addEventListener('applyParticipationApplication', (event) => {
      const newNotification = event.data;
      notify(newNotification);
    });

    // 참가 신청 승인 이벤트 리스너
    eventSource.addEventListener('approveParticipationApplication', (event) => {
      const newNotification = event.data;
      notify(newNotification);
    });

    // 참가 신청 거절 이벤트 리스너
    eventSource.addEventListener('rejectParticipationApplication', (event) => {
      const newNotification = event.data;
      notify(newNotification);
    });

    // 참가 신청 취소 이벤트 리스너
    eventSource.addEventListener('cancelParticipationApplication', (event) => {
      const newNotification = event.data;
      notify(newNotification);
    });

    // 모집글 후기 요청 이벤트 리스너
    eventSource.addEventListener('reviewRequest', (event) => {
      const newNotification = event.data;
      notify(newNotification);
    });

    // 모집글 댓글 작성 이벤트 리스너
    eventSource.addEventListener('writeComment', (event) => {
      const newNotification = event.data;
      notify(newNotification);
    });

    // 설정한 반경 내 동네 모집글 업로드 알림 이벤트 리스너
    eventSource.addEventListener('writeGatherArticle', (event) => {
      const newNotification = event.data;
      notify(newNotification);
    });

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
