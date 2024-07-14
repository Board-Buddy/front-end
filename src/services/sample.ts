import api from '@/services';

export const addNewPost = (data: { id: number; content: string }) =>
  api.post('posts', data);

export const getPosts = () => api.get('posts');
