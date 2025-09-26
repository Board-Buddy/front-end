'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { SSE_SUBSCRIPTION_URL } from '@/services/notification';
import { BellIcon } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const NotificationProvider = () => {
  const { userInfo } = useUserInfo();

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
    if (process.env.NODE_ENV === 'development' || !userInfo) return;

    const eventSource = new EventSource(SSE_SUBSCRIPTION_URL, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log('SSE connection established');
    };

    // 이벤트 리스너 등록
    const handleEvent = (event: MessageEvent) => notify(event.data);

    // 참가 신청 이벤트 리스너
    eventSource.addEventListener('applyParticipationApplication', handleEvent);

    // 참가 신청 승인 이벤트 리스너
    eventSource.addEventListener(
      'approveParticipationApplication',
      handleEvent,
    );

    // 참가 신청 거절 이벤트 리스너
    eventSource.addEventListener('rejectParticipationApplication', handleEvent);

    // 참가 신청 취소 이벤트 리스너
    eventSource.addEventListener('cancelParticipationApplication', handleEvent);

    // 모집글 후기 요청 이벤트 리스너
    eventSource.addEventListener('reviewRequest', handleEvent);

    // 모집글 댓글 작성 이벤트 리스너
    eventSource.addEventListener('writeComment', handleEvent);

    eventSource.onerror = (error) => {
      console.log('SSE error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, [userInfo]);
  return <></>;
};

export default NotificationProvider;
