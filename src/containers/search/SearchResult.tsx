'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Article as IArticle } from '@/types/article';
import Loading from '@/components/Loading';
import { useSearchArticles } from '@/hooks/useArticle';
import Article from '../home/Article';

interface Props {
  keyword: string;
  isRefetching: boolean;
}

const SearchResult = ({ keyword, isRefetching }: Props) => {
  const router = useRouter();

  const { data: posts, isPending, isError, error } = useSearchArticles(keyword);

  if (isPending) {
    return <></>;
  }

  if (isRefetching) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex justify-center pt-4 text-gray-500 text-sm">
        {error.response?.data.message}
      </div>
    );
  }

  return (
    <>
      {posts.map((article: IArticle) => (
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

export default SearchResult;
