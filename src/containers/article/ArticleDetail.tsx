'use client';

import ArticleContent from './ArticleContent';
import Profile from './Profile';
import ApplyButton from './ApplyButton';
import CommentList from './CommentList';

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
    startTime: '2024-07-20 11:00',
    endTime: '2024-07-20 13:00',
    createdAt: '2024-07-19 13:09',
    status: '모집중',
    participationStatus: 'author',
  };

  // TODO: id로 댓글 fetch
  const comments = [
    {
      id: 1,
      author: {
        nickname: '김한량',
        rank: 0,
        profileURL: 'http:~',
      },
      content: '댓글 내용 어쩌구',
      createdAt: '2024-06-20T13:21:00Z',
      replies: [
        {
          id: 4,
          author: {
            nickname: '이한량',
            rank: 1,
            profileURL: 'http:~',
          },
          content: '대댓글 내용 어쩌구',
          createdAt: '2024-06-20T13:21:00Z',
        },
        {
          id: 6,
          author: {
            nickname: '아리랑',
            rank: 0,
            profileURL: 'http:~',
          },
          content: '대댓글 내용 어쩌구',
          createdAt: '2024-06-20T13:21:00Z',
        },
      ],
    },
    {
      id: 2,
      author: {
        nickname: '김구구',
        rank: 2,
        profileURL: 'http:~',
      },
      content: '댓글 내용 어쩌구',
      createdAt: '2024-06-20T13:21:00Z',
      replies: [],
    },
  ];

  return (
    <div>
      <Profile author={article.author} />
      <ArticleContent
        title={article.title}
        description={article.description}
        meetingLocation={article.meetingLocation}
        maxParticipants={article.maxParticipants}
        currentParticipants={article.currentParticipants}
        startTime={article.startTime}
        endTime={article.endTime}
        createdAt={article.createdAt}
        status={article.status}
      />
      <CommentList />
      <ApplyButton participationStatus={article.participationStatus} />
    </div>
  );
};

export default ArticleDetail;
