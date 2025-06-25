import AuthGuard from '@/components/AuthGuard';
import { ReactNode } from 'react';

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
