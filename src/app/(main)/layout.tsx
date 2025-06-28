import AuthGuard from '@/components/AuthGuard';
import LoginPromptModal from '@/components/LoginPromptModal';
import { ReactNode } from 'react';

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <AuthGuard>
      {children}
      <LoginPromptModal />
    </AuthGuard>
  );
};

export default Layout;
