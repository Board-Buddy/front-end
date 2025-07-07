import AuthStatusLoader from '@/components/AuthStatusLoader';
import LoginPromptModal from '@/components/LoginPromptModal';
import { ReactNode } from 'react';

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <AuthStatusLoader>
      {children}
      <LoginPromptModal />
    </AuthStatusLoader>
  );
};

export default Layout;
