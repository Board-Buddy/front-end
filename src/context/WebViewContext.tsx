'use client';

import { createContext, ReactNode, useContext } from 'react';

const WebViewContext = createContext(false);

export const WebViewProvider = ({
  isWebView,
  children,
}: {
  isWebView: boolean;
  children: ReactNode;
}) => (
  <WebViewContext.Provider value={isWebView}>
    {children}
  </WebViewContext.Provider>
);

export const useWebViewContext = () => useContext(WebViewContext);
