'use client';

import { createContext, useContext, useState, ReactNode, useRef } from 'react';

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

  return (
    <HeaderContext.Provider
      value={{
        settingVisible,
        setSettingVisible,
        settingContent,
        setSettingContent,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }

  return context;
};
