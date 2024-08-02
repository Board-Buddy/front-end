import NotificationItem from '@/containers/notifications/NotificationItem';

const page = () => {
  const notifications = [
    {
      message: "lee 님이 '퇴근 후 보드게임...'에 참가 신청을 했습니다.",
      createdAt: '2024-08-02 14:54',
    },
    {
      message: "lee 님이 '퇴근 후 보드게임...'의 참가 신청을 취소했습니다.",
      createdAt: '2024-08-02 14:54',
    },
    {
      message: "lee 님이 '퇴근 후 보드게임...'에 참가 신청을 했습니다.",
      createdAt: '2024-08-02 14:54',
    },
  ];

  return (
    <div>
      {notifications.map((notification, i) => (
        <NotificationItem
          key={i}
          message={notification.message}
          createdAt={notification.createdAt}
        />
      ))}
    </div>
  );
};

export default page;
