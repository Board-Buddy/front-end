'use client';

import { ExistingProfileInfo } from '@/types/profile';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ContextType {
  formState: ExistingProfileInfo;
  setFormState: (state: ExistingProfileInfo) => void;
}

const ExistingProfileInfoContext = createContext<ContextType | undefined>(
  undefined,
);

export const ExistingProfileInfoContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formState, setFormState] = useState<ExistingProfileInfo>({
    nickname: '',
    profileImageFile: null,
    description: '',
  });

  return (
    <ExistingProfileInfoContext.Provider value={{ formState, setFormState }}>
      {children}
    </ExistingProfileInfoContext.Provider>
  );
};

export const useExistingProfileInfoContext = () => {
  const context = useContext(ExistingProfileInfoContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
