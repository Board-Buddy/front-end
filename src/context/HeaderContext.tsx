'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface HeaderContextType {
  settingVisible: boolean;
  setSettingVisible: (visible: boolean) => void;
  settingContent: ReactNode | undefined;
  setSettingContent: (content: ReactNode) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [settingVisible, setSettingVisible] = useState(false);
  const [settingContent, setSettingContent] = useState<ReactNode | undefined>(
    undefined,
  );

  const value = useMemo(
    () => ({
      settingVisible,
      setSettingVisible,
      settingContent,
      setSettingContent,
    }),
    [settingVisible, settingContent],
  );

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }

  return context;
};
