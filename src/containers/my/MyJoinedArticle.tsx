'use client';

import { useRouter } from 'next/navigation';
import Article from '../home/Article';

const MyJoinedArticle = () => {
  const router = useRouter();

  const posts = [
    {
      id: 1,
      title: '퇴근 후 보드게임 ㄱㄱ하실분',
      description: '스플렌더 하실 분~',
      meetingLocation: '레드버튼 신림점',
      maxParticipants: 4,
      currentParticipants: 2,
      startDateTime: '2024-07-20 11:00',
      endDateTime: '2024-07-20 13:00',
      createdAt: '2024-07-19 13:09',
      status: 'open',
    },
    {
      id: 2,
      title: '퇴근 후 보드게임 ㄱㄱ하실분',
      description: '스플렌더 하실 분~',
      meetingLocation: '레드버튼 신림점',
      maxParticipants: 4,
      currentParticipants: 2,
      startDateTime: '2024-07-20 11:00',
      endDateTime: '2024-07-20 13:00',
      createdAt: '2024-07-19 13:09',
      status: 'closed',
    },
    {
      id: 3,
      title: '퇴근 후 보드게임 ㄱㄱ하실분',
      description: '스플렌더 하실 분~',
      meetingLocation: '레드버튼 신림점',
      maxParticipants: 4,
      currentParticipants: 2,
      startDateTime: '2024-07-20 11:00',
      endDateTime: '2024-07-20 13:00',
      createdAt: '2024-07-19 13:09',
      status: 'closed',
    },
    {
      id: 4,
      title: '퇴근 후 보드게임 ㄱㄱ하실분',
      description: '스플렌더 하실 분~',
      meetingLocation: '레드버튼 신림점',
      maxParticipants: 4,
      currentParticipants: 2,
      startDateTime: '2024-07-20 11:00',
      endDateTime: '2024-07-20 13:00',
      createdAt: '2024-07-19 13:09',
      status: 'closed',
    },
  ];
  return (
    <>
      {posts.map((article) => (
        <Article
          onClick={() => router.push(`/article/${article.id}`)}
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          meetingLocation={article.meetingLocation}
          maxParticipants={article.maxParticipants}
          currentParticipants={article.currentParticipants}
          startDateTime={article.startDateTime}
          endDateTime={article.endDateTime}
          createdAt={article.createdAt}
          status={article.status}
        />
      ))}
    </>
  );
};

export default MyJoinedArticle;
