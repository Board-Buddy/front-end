import ChatItem from './ChatItem';

const ChatList = () => {
  const chatRooms = [
    {
      id: 1,
      postId: 30,
      title: '스플렌더 같이 하실 분 ㄱㄱ',
      participants: 8,
      location: '레드버튼 신림점',
      lastMessage: {
        content: '확인했습니다. 감사합니다 :)',
        sentTime: '2024-07-19 13:09',
      },
    },
    {
      id: 2,
      postId: 31,
      title: '스플렌더 같이 하실 분 ㄱㄱ',
      participants: 8,
      location: '레드버튼 신림점',
      lastMessage: {
        content: '확인했습니다. 감사합니다 :)',
        sentTime: '2024-07-19 13:09',
      },
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {chatRooms.map((chat) => (
        <ChatItem
          key={chat.id}
          id={chat.id}
          postId={chat.postId}
          title={chat.title}
          participants={chat.participants}
          meetingLocation={chat.location}
          lastMessage={chat.lastMessage}
        />
      ))}
    </div>
  );
};

export default ChatList;
