'use client';

import { Button } from '@/components/button';
import { checkUserLogin } from '@/services/auth';

export default function Home() {
  const loginCheck = async () => {
    const response = await checkUserLogin();
    console.log(response.data);
  };

  return (
    <main>
      <Button onClick={loginCheck}>loginCheck</Button>
    </main>
  );
}
