import { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  component?: ReactNode;
  render?: boolean;
}

const FallbackRender = ({ component, render, children }: Props) => {
  return <>{render ? component : children}</>;
};

export default FallbackRender;
