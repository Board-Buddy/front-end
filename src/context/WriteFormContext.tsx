'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(50, { message: '제목은 50자 이하로 입력 가능합니다.' }),
  date: z.date({ required_error: '날짜를 선택해주세요.' }),
  startHour: z.string(),
  endHour: z.string(),
  startMinute: z.string(),
  endMinute: z.string(),
  maxParticipants: z.string({ required_error: '인원을 선택해주세요.' }),
  meetingLocation: z.string({ required_error: '위치를 선택해주세요.' }),
  description: z.string().min(1, { message: '내용을 입력해주세요.' }),
  x: z.string().optional(),
  y: z.string().optional(),
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
    startHour: '',
    endHour: '',
    startMinute: '',
    endMinute: '',
    maxParticipants: '',
    meetingLocation: '',
    description: '',
    x: '',
    y: '',
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
