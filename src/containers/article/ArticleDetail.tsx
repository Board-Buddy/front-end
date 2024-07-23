'use client';

import { Comment } from '@/types/comment';
import ArticleContent from './ArticleContent';
import Profile from './Profile';
import ApplyButton from './ApplyButton';
import CommentList from './CommentList';
import { useGetArticle } from '@/hooks/useArticle';

const ArticleDetail = ({ id }: { id: number }) => {
  const { data: article, isPending, isError, error } = useGetArticle(id);

  // TODO: id로 댓글 fetch
  const commentList: Comment[] = [
    {
      id: 1,
      author: {
        nickname: 'yubin',
        rank: 0,
        profileImageS3SavedURL: '',
      },
      content: '댓글 내용 어쩌구',
      createdAt: '2024-06-20T13:21:00Z',
      replies: [
        {
          id: 4,
          author: {
            nickname: '이한량',
            rank: 1,
            profileImageS3SavedURL: '',
          },
          content: '대댓글 내용 어쩌구',
          createdAt: '2024-06-20T13:21:00Z',
        },
        {
          id: 6,
          author: {
            nickname: '아리랑',
            rank: 0,
            profileImageS3SavedURL: '',
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
        profileImageS3SavedURL: '',
      },
      content: '댓글 내용 어쩌구',
      createdAt: '2024-06-20T13:21:00Z',
      replies: [],
    },
  ];

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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
      <ApplyButton participationStatus={article.participationStatus!} />
      <CommentList commentList={commentList} />
    </div>
  );
};

export default ArticleDetail;
