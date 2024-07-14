import { http, HttpResponse } from 'msw';

const allPosts = new Map();

const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const handlers = [
  http.get(`${SERVER_URL}/posts`, () => {
    console.log('Captured a "GET /posts" request');

    return HttpResponse.json(Array.from(allPosts.values()));
  }),
  http.post(`${SERVER_URL}/posts`, async ({ request }) => {
    console.log('Captured a "POST /posts" request');

    const newPost = (await request.json()) as {
      id: number;
      content: string;
    };
    allPosts.set(newPost.id as number, newPost);
    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.delete(`${SERVER_URL}/posts:id`, ({ params }) => {
    console.log(`Captured a "DELETE /posts/${params.id}" request`);

    const { id } = params;
    const deletedPosts = allPosts.get(id);

    if (!deletedPosts) {
      return new HttpResponse(null, { status: 404 });
    }

    allPosts.delete(id);
    return HttpResponse.json(deletedPosts);
  }),
];
