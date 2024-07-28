'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddComment } from '@/hooks/useComment';
import { useState } from 'react';

const CommentInput = ({ articleId }: { articleId: number }) => {
  const [value, setValue] = useState('');

  const mutation = useAddComment(articleId);

  const handleSubmit = () => {
    mutation.mutate(value);
    setValue('');
  };

  return (
    <div className="mt-4 flex gap-2">
      <Input
        placeholder="댓글 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button className="text-white font-bold" onClick={handleSubmit}>
        등록
      </Button>
    </div>
  );
};

export default CommentInput;
