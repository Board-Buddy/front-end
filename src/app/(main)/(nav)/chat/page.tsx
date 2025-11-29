import ChatRoomList from '@/containers/chat/ChatRoomList';
import ChatRoomListContainer from '@/containers/chat/ChatRoomListContainer';

const page = async () => {
  return (
    <ChatRoomListContainer>
      <ChatRoomList />
    </ChatRoomListContainer>
  );
};

export default page;
