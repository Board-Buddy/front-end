'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(50, { message: '제목은 50자 이하로 입력 가능합니다.' }),
  date: z.date({ required_error: '날짜를 선택해주세요.' }),
  startHour: z.coerce.number().min(0).max(24),
  endHour: z.coerce.number().min(0).max(24),
  startMinute: z.coerce.number().min(0).max(59),
  endMinute: z.coerce.number().min(0).max(59),
  personnel: z.coerce
    .number({ message: '인원을 선택해주세요.' })
    .min(2)
    .max(10),
  location: z.string({ required_error: '위치를 선택해주세요.' }),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface FormContextType {
  formState: FormSchemaType;
  setFormState: (state: FormSchemaType) => void;
}

const WriteFormContext = createContext<FormContextType | undefined>(undefined);

export const WriteFormProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<FormSchemaType>({
    title: '',
    date: new Date(),
    startHour: 0,
    endHour: 0,
    startMinute: 0,
    endMinute: 0,
    personnel: 2,
    location: '',
    content: '',
  });

  return (
    <WriteFormContext.Provider value={{ formState, setFormState }}>
      {children}
    </WriteFormContext.Provider>
  );
};

export const useWriteFormContext = () => {
  const context = useContext(WriteFormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
