'use client';

import useAppRouter, { NavigateArgs } from '@/hooks/custom/useAppRouter';
import React from 'react';

type AppLinkProps = React.HTMLAttributes<HTMLElement> &
  Omit<NavigateArgs, 'options'> & {
    replace?: boolean;
    as?: 'a' | 'button';
    className?: string;
    children: React.ReactNode;
  };

const AppLink = ({
  href,
  screenName,
  replace = false,
  headerTitle,
  as = 'a',
  className,
  children,
  ...props
}: AppLinkProps) => {
  const router = useAppRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const method = replace ? 'replace' : 'push';
    router[method]({ href, screenName, headerTitle });
  };

  const Element = as;

  return (
    <Element
      onClick={handleClick}
      href={as === 'a' ? href : undefined}
      type={as === 'button' ? 'button' : undefined}
      aria-label={headerTitle || (typeof href === 'string' ? href : undefined)}
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
};

export default AppLink;
