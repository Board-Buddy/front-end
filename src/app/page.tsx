'use client';

import { Button } from '@/components/button';
import { addNewPost, getPosts } from '@/services/sample';

export default function Home() {
  const newPostClick = async () => {
    const response = await addNewPost({
      id: Math.floor(Math.random() * 10000),
      content: 'new post',
    });
    console.log(response.data);
  };

  const getPostClick = async () => {
    const response = await getPosts();
    console.log(response.data);
  };

  return (
    <main>
      <Button onClick={newPostClick}>newPost</Button>
      <Button onClick={getPostClick}>getPost</Button>
    </main>
  );
}
