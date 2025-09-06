import AuthStatusLoader from '@/components/AuthStatusLoader';
import LoginPromptModal from '@/components/LoginPromptModal';
import { checkUserLogin } from '@/services/auth';
import { ReactNode } from 'react';

const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const isLoggedIn = await checkUserLogin();

  return (
    <AuthStatusLoader loggedIn={isLoggedIn}>
      {children}
      <LoginPromptModal />
    </AuthStatusLoader>
  );
};

export default Layout;
