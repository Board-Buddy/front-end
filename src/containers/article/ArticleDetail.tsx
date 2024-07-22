'use client';

import Profile from './Profile';

const ArticleDetail = ({ id }: { id: string }) => {
  // TODO: id로 article fetch
  const article = {
    title: '퇴근 후 보드게임 ㄱㄱ하실분',
    description: '스플렌더 하실 분~',
    author: {
      nickname: '김보드',
      rank: 1,
      profileURL: 'https://',
      description: '자기소개',
    },
    meetingLocation: '레드버튼 신림점',
    maxParticipants: 4,
    currentParticipants: 2,
    startDateTime: '2024-07-20 11:00',
    endDateTime: '2024-07-20 13:00',
    createdAt: '2024-07-19 13:09',
    status: '모집중',
    participationStatus: 'author',
  };

  return (
    <div>
      <Profile author={article.author} />
    </div>
  );
};

export default ArticleDetail;
