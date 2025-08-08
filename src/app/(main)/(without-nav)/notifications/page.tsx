import NotificationList from '@/containers/notifications/NotificationList';
import NotificationListContainer from '@/containers/notifications/NotificationListContainer';

const Page = async () => {
  return (
    <NotificationListContainer>
      <NotificationList />
    </NotificationListContainer>
  );
};

export default Page;
